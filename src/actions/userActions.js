import Axios from "axios";
import { USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants/userConstants"

export const register = (name, username, password, phoneNumber, email, onRegisteredSuccess) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { username, password } });
    try {
        const { data } = await Axios.post('/api/auth/signup', { name, username, password, phoneNumber, email });
        await dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });
        onRegisteredSuccess?.();
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    }
}

export const signin = (username, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } });
    try {
        const { data } = await Axios.post('/api/auth/login', { username, password });
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    }
}

export const signout = (onLoggedOut) => async (dispatch) => {
    localStorage.removeItem('userInfo');
    await dispatch({ type: USER_SIGNOUT });
    onLoggedOut?.()
}


export const listCustomers = () => async (dispatch) => {
    dispatch({
        type: USER_LIST_REQUEST
    });
    try {
        let user = JSON.parse(localStorage.getItem('userInfo'));
        const token = user.token;
        const { data } = await Axios.get('/api/bookstore/admin/customers', {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_LIST_FAIL, payload: error.message });
    }
}

export const deleteUser = (userId) => async (dispatch) => {
    dispatch({ type: USER_DELETE_REQUEST, payload: userId });
    try {
        let user = JSON.parse(localStorage.getItem('userInfo'));
        const token = user.token;
        const { data } = await Axios.delete(`/api/bookstore/admin/accounts/${userId}/delete`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });
        dispatch(listCustomers());
        dispatch({ type: USER_DELETE_SUCCESS, payload: data, success: true });

    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL, payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        });
    }
}