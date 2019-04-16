import { homeApi,getProductsApi,addToCartApi,getCartDetailAPI,getBuyerOrderApi,getProductDetailApi,getBuyerOrdersApi,searchProductsApi,profileInfoApi,notificationApi, registerApi } from './api'

export const initiateHomeScreen = () => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(homeApi())
    }
}

export const initiateAccountScreen = () => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(profileInfoApi(token))
    }
}

export const initiateNotificationScreen = () => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(notificationApi(token))
    }
}

export const getProducts = () => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(getProductsApi(token))
    }
}

export const searchProducts = (val) => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(searchProductsApi(token,val))
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

export const register = (user_name, user_username, user_email, user_password ) => {
    return (dispatch, getState) => {
        dispatch(registerApi(user_name, user_username, user_email, user_password ))
    }
}

export const initiateOrdersScreen = () => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(getBuyerOrdersApi(token))
    }
}

export const initiateOrderScreen = () => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(getBuyerOrderApi(token))
    }
}

export const initiateProductDetailScreen = (product_id) => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(getProductDetailApi(token,product_id))
    }
}