import { ADD_HEALTH_HISTORY, GET_HEALTH_HISTORY } from "../constants/actionTypes";

const healthHistoryReducer = (state = { currentHealthHistory: [], healthHistoryData: [] }, action) => {
    switch (action.type) {
        case ADD_HEALTH_HISTORY:
            return { ...state, currentHealthHistory: action.payload }
        case GET_HEALTH_HISTORY:
            return { ...state, healthHistoryData: action.payload}
        default:
            return state
    }
}

export default healthHistoryReducer 