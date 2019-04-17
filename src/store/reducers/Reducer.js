import { combineReducers } from "redux";

const loginReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_LOGIN':
            return { ...state, ...action.payload }

        default:
            return state
    }
}

const userReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_USER':
            return { ...state, ...action.payload }

        case 'LOGOUT':
            return { state: null }

        default:
            return state
    }
}

const homeScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_HOME_ITEMS':
            return { ...state, ...action.payload }

        default:
            return state
    }
}

const productsReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return { ...state, ...action.payload }

        default:
            return state
    }
}

const cartDetailScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_CART_DETAIL':
            return { ...state, ...action.payload }

        default:
            return state
    }
}

const registerReducer = (state = [], action) => {
    switch (action.type) {
        case 'SIGN_UP':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const orderScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_ORDER_DETAIL':
            return { ...state, ...action.payload }

        default:
            return state
    }
}

const ordersScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_ORDERS':
            return { ...state, ...action.payload }

        default:
            return state
    }
}

const productDetailScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_PRODUCT_DETAIL':
            return { ...state, ...action.payload }

        default:
            return state
    }
}

const accountScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_PROFILE':
            return { ...state, ...action.payload }
        case 'GET_PROFILE_INFO':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const notificationScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_NOTIFICATIONS':
            return { ...state, ...action.payload }

        default:
            return state
    }
}


const sidebarReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SIDEBAR':
            return { ...state, ...action.payload }

        default:
            return state
    }
}

const searchReducer = (state = [], action) => {
    switch (action.type) {
        case 'SEARCH_PRODUCTS':
            return { ...state, ...action.payload }

        case 'CLEAR_RESULT':
            return { state: null }

        default:
            return state
    }
}

export default reducer = combineReducers({ userReducer, homeScreenReducer, productsReducer, cartDetailScreenReducer, orderScreenReducer, productDetailScreenReducer, ordersScreenReducer, sidebarReducer, searchReducer, accountScreenReducer, notificationScreenReducer, registerReducer, loginReducer });
