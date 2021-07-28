import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import { categoryCreateOrUpdateReducer, categoryDeleteReducer, productCategoryListReducer, productCreateOrUpdateReducer, productCreateReducer, productDeleteReducer, productDetailReducer, productListFeatureReducer, productListReducer } from './reducers/productReducer';
import { userDeleteReducer, userListReducer, userRegisterReducer, userSigninReducer } from './reducers/userReducer';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    }
};

const reducer = combineReducers({
    productList: productListReducer,
    productListFeature: productListFeatureReducer,
    productDetails: productDetailReducer,
    productCategoryList: productCategoryListReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productCreateOrUpdate: productCreateOrUpdateReducer,
    productDelete: productDeleteReducer,
    categoryCreateOrUpdate: categoryCreateOrUpdateReducer,
    categoryDelete: categoryDeleteReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;