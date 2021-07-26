import Axios from "axios";
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants/userConstants"

export const register = (name, username, password, phoneNumber, onRegisteredSuccess) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { username, password } });
    try {
        const { data } = await Axios.post('/api/auth/signup', { name, username, password, phoneNumber });
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