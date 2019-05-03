import {Alert} from 'react-native'
import { SecureStore, Facebook, GoogleSignIn } from 'expo'
import { homeApi, getProductsApi, addToCartApi, getCartDetailAPI, getBuyerOrderApi, getProductDetailApi, getBuyerOrdersApi, searchProductsApi, profileInfoApi, notificationApi, registerApi, loginApi, fbLoginApi, removeCartItemAPI, updateCartQtyAPI, updateUserInfoAPI, readNotifications,toggleFavoriteApi,getFavoriteProductsApi,googleLoginApi } from './api'




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

export const addToCart = (selprod_id,quantity) => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(addToCartApi(token,selprod_id,quantity))
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
        dispatch({type:'ROOT_LOG_OUT'})
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
            Alert.alert(`Facebook Login Betul: ${token}`);
            dispatch(fbLoginApi(token))
        } catch ({ message }) {
            Alert.alert(`Facebook Login Error: ${message}`);
        }
    }
}

export const handleGoogleSignIn =  () => {
    return async (dispatch, getState) => {
        await Alert.alert('wow')

          try {
                await GoogleSignIn.askForPlayServicesAsync();
                const { type, user }=cacat = await GoogleSignIn.signInAsync();
                const {auth}=user
                const {idToken}=auth
                await dispatch({ type: 'DATA_FROM_GOOGLE', payload: { cacat:idToken } })
                if (type === 'success') {
                    await Alert.alert({ googleError: `user : ${JSON.stringify(user)}` })
                }
            } catch ({ message }) {
                await Alert.alert('login: Error:' + message);
                await Alert.alert({ googleError: `error masa login ialah : ${message}` })
            }
 
     }
};

export const processGoogleToken =  (token) => {
    return  (dispatch, getState) => {
         dispatch(googleLoginApi(token))
     }
};

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
        const {phone, dob, city, name } = getState().accountScreenReducer
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
        dispatch(toggleFavoriteApi(token,selprod_id))
      
    }
}

export const initiateFavoriteScreen = () => {
    return (dispatch, getState) => {
        const { token } = getState().userReducer
        dispatch(getFavoriteProductsApi(token))
    }
}