import { DELETE_TREATMENT, GET_ALL_TREATMENTS, CREATE_NEW_TREATMENTPLAN, GET_USER_TREATMENTPLANS, GET_TREATMENTPLAN_BYID, GET_TREATMENT, UPDATE_TREATMENT, GET_TREATMENTS_BY_TREATMENTPLANID, ADD_TREATMENT, GET_TREATMENTS_BY_CLIENTID } from "../constants/actionTypes";

const treatmentPlanReducer = (state = { treatmentPlans: null, currentTreatmentPlan: null, treatment: null, treatments: null }, action) => {
    switch (action.type) {
        case CREATE_NEW_TREATMENTPLAN:
            return { ...state, currentTreatmentPlan: action.payload }
        case GET_TREATMENTPLAN_BYID: 
            return { ...state, currentTreatmentPlan: action.payload}
        case GET_USER_TREATMENTPLANS: 
            return { ...state, treatmentPlans: action.payload }
        case GET_TREATMENT:
            return { ...state, treatment: action.payload}
        case UPDATE_TREATMENT:
            return { ...state, treatment: action.payload}
        case GET_TREATMENTS_BY_TREATMENTPLANID:
            return { ...state, treatments: action.payload}
        case ADD_TREATMENT: 
            return { ...state, treatment: action.payload}
        case GET_TREATMENTS_BY_CLIENTID:
            return { ...state, treatments: action.payload}
        case GET_ALL_TREATMENTS:
            return { ...state, treatments: action.payload}
        case DELETE_TREATMENT: 
            return { ...state, treatments: action.payload}
        default:
            return state
    }
}

export default treatmentPlanReducer 