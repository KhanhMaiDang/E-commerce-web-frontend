import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import { productCategoryListReducer, productDetailReducer, productListReducer } from './reducers/productReducer';
import { userRegisterReducer, userSigninReducer } from './reducers/userReducer';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    }
};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailReducer,
    productCategoryList: productCategoryListReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;