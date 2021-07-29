import Axios from "axios";
import { CATEGORY_DELETE_FAIL, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_SAVE_FAIL, CATEGORY_SAVE_REQUEST, CATEGORY_SAVE_SUCCESS, PRODUCT_CATEGORY_LIST_FAIL, PRODUCT_CATEGORY_LIST_REQUEST, PRODUCT_CATEGORY_LIST_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_FEATURE_FAIL, PRODUCT_LIST_FEATURE_REQUEST, PRODUCT_LIST_FEATURE_SUCCESS, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS } from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });
    try {
        const { data } = await Axios.get('/api/bookstore/public/books');
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
}

export const listFeatureProducts = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_FEATURE_REQUEST
    });
    try {
        const { data } = await Axios.get('/api/bookstore/public/books/featured');
        dispatch({ type: PRODUCT_LIST_FEATURE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FEATURE_FAIL, payload: error.message });
    }
}

export const createOrUpdateProduct = (productInfo, formData) => async (dispatch, getState) => {
    dispatch({
        type: PRODUCT_SAVE_REQUEST
    })
    try {
        let user = JSON.parse(localStorage.getItem('userInfo'));
        const token = user.token;
        console.log("data")
        console.log(productInfo)
        if (!productInfo.id) {
            const { data } = await Axios.post('/api/bookstore/admin/book', productInfo, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            console.log(formData);
            if (formData.has("file")) {
                console.log("yes file");
                Axios.post(`/api/bookstore/admin/${data.id}/upImage`, formData, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(res => alert(res.data))
                    .catch(err => console.log(err));
            }
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
        }
        //send hinhs
        else {
            const { data } = await Axios.put(`/api/bookstore/admin/books/${productInfo.id}/edit`, productInfo, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            if (formData.has("file")) {
                console.log("yes file");
                Axios.post(`/api/bookstore/admin/${data.id}/upImage`, formData, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(res => alert(res.data))
                    .catch(err => console.log(err));
            }
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
        }


    } catch (error) {
        dispatch({
            type: PRODUCT_SAVE_FAIL, payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        });
    }

}

export const detailsProduct = (productId) => async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    try {
        const { data } = await Axios.get(`/api/bookstore/public/books/${productId}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL, payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        });
    }
}
export const deleteProduct = (productId) => async (dispatch) => {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    try {
        let user = JSON.parse(localStorage.getItem('userInfo'));
        const token = user.token;
        const { data } = await Axios.delete(`/api/bookstore/admin/books/${productId}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });
        dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL, payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        });
    }
}

export const listProductCategories = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_CATEGORY_LIST_REQUEST,
    });
    try {
        const { data } = await Axios.get(`/api/bookstore/public/categories`);
        dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message });
    }
};

export const createOrUpdateCategory = (categoryInfo) => async (dispatch, getState) => {
    dispatch({
        type: CATEGORY_SAVE_REQUEST
    })
    try {
        let user = JSON.parse(localStorage.getItem('userInfo'));
        const token = user.token;
        console.log("data")
        console.log(categoryInfo)
        if (!categoryInfo.id) {
            const { data } = await Axios.post('/api/bookstore/admin/category', categoryInfo, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            dispatch({ type: CATEGORY_SAVE_SUCCESS, payload: data });
        }
        else {
            const { data } = await Axios.put(`/api/bookstore/admin/categories/${categoryInfo.id}`, categoryInfo, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            dispatch({ type: CATEGORY_SAVE_SUCCESS, payload: data });
        }


    } catch (error) {
        dispatch({ type: CATEGORY_SAVE_FAIL, payload: error.message });
    }

}

export const deleteCategory = (categoryId) => async (dispatch) => {
    dispatch({ type: CATEGORY_DELETE_REQUEST, payload: categoryId });
    try {
        let user = JSON.parse(localStorage.getItem('userInfo'));
        const token = user.token;
        const { data } = await Axios.delete(`/api/bookstore/admin/categories/${categoryId}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });
        dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data, success: true });

    } catch (error) {
        dispatch({
            type: CATEGORY_DELETE_FAIL, payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        });
    }
}