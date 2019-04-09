import { homeApi,getProductsApi,addToCartApi,getCartDetailAPI } from './api'

export const initiateHomeScreen = () => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(homeApi(token))
    }
}

export const getProducts = () => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(getProductsApi(token))
    }
}

export const addToCart = (selprod_id) => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(addToCartApi(token,selprod_id))
    }
}

export const initiateCartDetailScreen = () => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(getCartDetailAPI(token))
    }
}