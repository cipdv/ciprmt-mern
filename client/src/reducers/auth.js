import { AUTH, LOGOUT, RMT_AUTH, USER_TYPE_VERIFICATION } from '../constants/actionTypes'

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH: 
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return { ...state, authData: action.data }
        case LOGOUT:
            localStorage.clear()
            return { ...state, authData: null }
        case RMT_AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return { ...state, authData: action.data }
        case USER_TYPE_VERIFICATION:
            return action.payload
        default:
            return state
    }
}

export default authReducer