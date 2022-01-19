import * as api from '../api'

export const addToEAL = (data) => async (dispatch) => {
    try {
        const {data} = await api.submitAppointmentForm(formData)       
        dispatch({ type: SUBMIT_APPOINTMENT_FORM, data})
        history.push('/dashboard')
    } catch (error) {
        console.log(error)
    }
}