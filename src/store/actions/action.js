import { Alert } from 'react-native'
import { SecureStore, Facebook, GoogleSignIn } from 'expo'
import { homeApi, getProductsApi, addToCartApi, getCartDetailAPI, getBuyerOrderApi, getProductDetailApi, getBuyerOrdersApi, searchProductsApi, profileInfoApi, notificationApi, registerApi, loginApi, fbLoginApi, removeCartItemAPI, updateCartQtyAPI, updateUserInfoAPI, readNotifications, toggleFavoriteApi, getFavoriteProductsApi, forgotPasswordAPI, updateAddressAPI, getAddressAPI, deleteAddressAPI, getCountriesAPI, getStatesAPI, changePasswordAPI, primaryAddressAPI, getShopDetailAPI, getProductShopApi, sendTextShopApi } from './api'




export const initiateHomeScreen = () => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(homeApi(token))
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
        dispatch(searchProductsApi(token, val))
    }
}

export const addToCart = (selprod_id, quantity) => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(addToCartApi(token, selprod_id, quantity))
    }
}

export const initiateCartDetailScreen = () => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(getCartDetailAPI(token))
    }
}

export const register = (user_name, user_username, user_email, user_password) => {
    return (dispatch, getState) => {
        dispatch(registerApi(user_name, user_username, user_email, user_password))
    }
}

export const login = () => {
    return (dispatch, getState) => {
        const { email, password } = getState().loginReducer

        dispatch(loginApi(email, password))
    }
}

export const logout = () => {
    return async (dispatch, getState) => {
        await SecureStore.deleteItemAsync('authentication')
        dispatch({ type: 'LOGOUT' })
    }
}


export const rootLogout = () => {
    return async (dispatch, getState) => {
        await SecureStore.deleteItemAsync('authentication')
        dispatch({ type: 'ROOT_LOG_OUT' })
        dispatch(initiateHomeScreen())
    }
}

export const fbLogin = () => {
    return async (dispatch, getState) => {
        try {
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync('1985454545081156', { permissions: ['public_profile'], });
            dispatch(fbLoginApi(token))
        } catch ({ message }) {
            Alert.alert(`Facebook Login Error: ${message}`);
        }
    }
}

export const checkLogin = () => {
    return async (dispatch, getState) => {
        const authentication = await SecureStore.getItemAsync('authentication');
        const parsedAuthentication = JSON.parse(authentication)
        authentication ? dispatch({ type: 'GET_USER', payload: { ...parsedAuthentication } }) : null


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
        dispatch(getProductDetailApi(token, product_id))
    }
}

export const initiateApp = () => {
    return (dispatch, getState) => {
        dispatch(checkLogin())
        dispatch(initiateHomeScreen())
        dispatch(getProducts())
    }
}

export const removeCartItem = (key) => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(removeCartItemAPI(token, key))
    }
}

export const updateCartQty = (key, quantity) => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(updateCartQtyAPI(token, key, quantity))
    }
}

export const updateProfileInfo = () => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        const { phone, dob, city, name } = getState().accountScreenReducer
        dispatch(updateUserInfoAPI(token, phone, dob, city, name))
    }
}

export const readNotificationScreen = (unotification_id) => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(readNotifications(token, unotification_id))
    }
}
export const setFavorite = (selprod_id) => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(toggleFavoriteApi(token, selprod_id))

    }
}

export const initiateFavoriteScreen = () => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(getFavoriteProductsApi(token))
    }
}

export const forgotPassword = () => {
    return (dispatch, getState) => {
        const { email } = getState().loginReducer
        dispatch(forgotPasswordAPI(email))
    }
}

export const getAddress = () => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(getAddressAPI(token))
        // const { data } = await getState().addressScreenReducer
    }
}

export const addAddress = () => {
    return (dispatch, getState) => {
        const { uid } = ""
        const { token } = getState().userReducer
        const { zip, name, city, address_2, address_1, phone, country_id, states_id } = getState().addressScreenReducer
        dispatch(updateAddressAPI(token, zip, name, city, address_2, address_1, phone, uid, country_id, states_id))
    }
}

export const updateAddress = (uid) => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        const { ua_zip, ua_name, ua_city, ua_address2, ua_address1, ua_phone, country_id, states_id } = getState().addressScreenReducer
        dispatch(updateAddressAPI(token, ua_zip, ua_name, ua_city, ua_address2, ua_address1, ua_phone, uid, country_id, states_id))
    }
}

export const deleteAddress = (ua_id) => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(deleteAddressAPI(token, ua_id))
    }
}

export const getCountries = () => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(getCountriesAPI(token))
    }
}

export const getStates = (country_id) => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(getStatesAPI(token, country_id))
    }
}

export const changePassword = () => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        const { newPassword, confirmPassword, oldPassword } = getState().accountScreenReducer
        dispatch(changePasswordAPI(token, newPassword, confirmPassword, oldPassword))
    }
}

export const makeAddressPrimary = (uid) => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(primaryAddressAPI(token, uid))
    }
}

export const getShopDetail = (shop_id) => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(getShopDetailAPI(token, shop_id))
    }
}

export const getProductShop = (shop_id) => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(getProductShopApi(token, shop_id))
    }
}

export const sendTextShop = (subject, shop_id, message) => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(sendTextShopApi(token, subject, shop_id, message))
    }
}