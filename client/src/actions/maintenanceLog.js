import * as api from '../api'

//constants
import { GET_MAINTENANCE_LOGS } from '../constants/actionTypes'

export const getMaintenanceLogs = () => async (dispatch) => {
    try {
        const { data } = await api.getMaintenanceLogs()
        dispatch({type: GET_MAINTENANCE_LOGS, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}
