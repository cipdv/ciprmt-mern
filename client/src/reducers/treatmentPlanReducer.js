import { bindActionCreators } from "redux";
import { CREATE_NEW_TREATMENTPLAN, GET_USER_TREATMENTPLANS, GET_TREATMENTPLAN_BYID, GET_TREATMENT } from "../constants/actionTypes";

const financialsReducer = (state = { treatmentPlans: null, currentTreatmentPlan: null, treatment: null }, action) => {
    switch (action.type) {
        case CREATE_NEW_TREATMENTPLAN:
            return { ...state, currentTreatmentPlan: action.payload }
        case GET_TREATMENTPLAN_BYID: 
            return { ...state, currentTreatmentPlan: action.payload}
        case GET_USER_TREATMENTPLANS: 
            return { ...state, treatmentPlans: action.payload }
        case GET_TREATMENT:
            return { ...state, treatment: action.payload}
        default:
            return state
    }
}

export default financialsReducer 