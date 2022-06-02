import { GET_MAINTENANCE_LOGS } from "../constants/actionTypes";

const maintenanceLogReducer = (state = { maintenanceLogs: [] }, action) => {

    switch (action.type) {
        case GET_MAINTENANCE_LOGS:
            return { ...state, maintenanceLogs: action?.payload} 
        default:
            return state
    }
}

export default maintenanceLogReducer 