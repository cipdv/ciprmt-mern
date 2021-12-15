import { UPDATE_USER, SUBMIT_HH, GET_ALL_USERS, GET_USER, SUBMIT_APPOINTMENT_FORM, SEARCH_USERS, GET_APPOINTMENT, UPDATE_APPOINTMENT, ADD_APPOINTMENT, GET_APPOINTMENTS } from '../constants/actionTypes'

const usersReducer = (state={ users: [], user: [], appointment: []}, action) => {
    switch (action.type) {
        case SUBMIT_HH:
            return { ...state, users: action.payload}
        case GET_ALL_USERS:
            return { ...state, users: action.payload }
        case GET_USER: 
            return { ...state, user: action.payload }
        case SUBMIT_APPOINTMENT_FORM:
            return { ...state, users: action.payload }
        case SEARCH_USERS: 
            return { ...state, users: action.payload }
        case GET_APPOINTMENT:
            return { ...state, appointment: action.payload }
        case UPDATE_APPOINTMENT: 
            return { ...state, appointment: action.payload }
        case ADD_APPOINTMENT:
            return { ...state, appointment: action.payload }
        case GET_APPOINTMENTS: 
            return { ...state, appointment: action.payload }
        case UPDATE_USER: 
            return { ...state, user: action.payload}
        default:
            return state
    }
}

export default usersReducer