import { combineReducers } from "redux"

import authReducer from './auth'
import usersReducer from "./usersReducer"
import financialsReducer from './financialsReducer'
import treatmentPlanReducer from './treatmentPlanReducer'

export const reducers = combineReducers({
    authReducer,
    usersReducer,
    financialsReducer, 
    treatmentPlanReducer
})