import { combineReducers } from "redux"

import authReducer from './auth'
import usersReducer from "./usersReducer"
import financialsReducer from './financialsReducer'
import treatmentPlanReducer from './treatmentPlanReducer'
import healthHistoryReducer from './healthHistoryReducer'

export const reducers = combineReducers({
    authReducer,
    usersReducer,
    financialsReducer, 
    treatmentPlanReducer,
    healthHistoryReducer
})