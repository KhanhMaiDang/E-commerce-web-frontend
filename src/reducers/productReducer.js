import { CATEGORY_DELETE_FAIL, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_SAVE_FAIL, CATEGORY_SAVE_REQUEST, CATEGORY_SAVE_SUCCESS, PRODUCT_CATEGORY_LIST_FAIL, PRODUCT_CATEGORY_LIST_REQUEST, PRODUCT_CATEGORY_LIST_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_FEATURE_FAIL, PRODUCT_LIST_FEATURE_REQUEST, PRODUCT_LIST_FEATURE_SUCCESS, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS } from "../constants/productConstants";

export const productListReducer = (state = { loading: true, products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] };
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload };
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const productListFeatureReducer = (state = { loading: true, products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_FEATURE_REQUEST:
            return { loading: true, products: [] };
        case PRODUCT_LIST_FEATURE_SUCCESS:
            return { loading: false, products: action.payload };
        case PRODUCT_LIST_FEATURE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const productDetailReducer = (state = { product: {}, loading: true }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
export const productDeleteReducer = (state = { product: {}, loading: true }, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true };
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, product: action.payload, success: true };
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
export const productCreateOrUpdateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_SAVE_REQUEST:
            return { loading: true };
        case PRODUCT_SAVE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case PRODUCT_SAVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const productCategoryListReducer = (state = { loading: true, categories: [] }, action) => {
    switch (action.type) {
        case PRODUCT_CATEGORY_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_CATEGORY_LIST_SUCCESS:
            return { loading: false, categories: action.payload };
        case PRODUCT_CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const categoryCreateOrUpdateReducer = (state = { category: {}, success: false }, action) => {
    switch (action.type) {
        case CATEGORY_SAVE_REQUEST:
            return { loading: true, success: false };
        case CATEGORY_SAVE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case CATEGORY_SAVE_FAIL:
            return { loading: false, error: action.payload.message };
        default:
            return state;
    }
}

export const categoryDeleteReducer = (state = { category: {}, loading: false, success: false }, action) => {
    switch (action.type) {
        case CATEGORY_DELETE_REQUEST:
            return { loading: true };
        case CATEGORY_DELETE_SUCCESS:
            return { loading: false, category: action.payload, success: true };
        case CATEGORY_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}