import { combineReducers } from "redux";

const userReducer = (state ={token:'3a59fa293b050cd49fc47175414e5e1c'}, action) => {
    switch (action.type) {
        case 'GET_USER':
            return { ...state, ...action.payload }      

        default:
            return state
    }
}

const homeScreenReducer = (state =[], action) => {
    switch (action.type) {
        case 'GET_HOME_ITEMS':
            return { ...state, ...action.payload }      

        default:
            return state
    }
}

const productsReducer = (state =[], action) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return { ...state, ...action.payload }      

        default:
            return state
    }
}


export default reducer = combineReducers({userReducer,homeScreenReducer,productsReducer });