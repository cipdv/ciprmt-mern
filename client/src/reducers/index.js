import { combineReducers } from "redux";

import authReducer from './auth'
import usersReducer from "./usersReducer";
import financialsReducer from './financialsReducer'

export const reducers = combineReducers({
    authReducer,
    usersReducer,
    financialsReducer
})