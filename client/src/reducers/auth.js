import { AUTH, HIDE_LOADER, LOGOUT, RMT_AUTH, SHOW_LOADER, USER_TYPE_VERIFICATION } from '../constants/actionTypes'

const authReducer = (state = { authData: null, loading: false }, action) => {
    switch (action.type) {
        case AUTH: 
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return { ...state, authData: action.data, loading: false }
        case LOGOUT:
            localStorage.clear()
            return { ...state, authData: null }
        case RMT_AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return { ...state, authData: action.data, loading: false }
        case USER_TYPE_VERIFICATION:
            return action.payload
        case SHOW_LOADER:
            return { ...state, loading: true}
        case HIDE_LOADER:
            return { ...state, loading: false}
        default:
            return state
    }
}

export default authReducer