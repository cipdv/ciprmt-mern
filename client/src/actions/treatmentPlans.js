import * as api from '../api'

import { GET_ALL_TREATMENTS, GET_USER_TREATMENTPLANS, CREATE_NEW_TREATMENTPLAN, GET_TREATMENTPLAN_BYID, GET_TREATMENT, UPDATE_TREATMENT, GET_TREATMENTS_BY_CLIENTID, GET_TREATMENTS_BY_TREATMENTPLANID, ADD_TREATMENT, SHOW_LOADING_SCREEN, HIDE_LOADING_SCREEN, DELETE_TREATMENT, UPDATE_TREATMENT_PLAN } from '../constants/actionTypes'

export const createNewTreatmentPlan = (tpForm, userId) => async (dispatch) => {
    try {
        const {data} = await api.createNewTreatmentPlan(tpForm, userId)
        dispatch({type: CREATE_NEW_TREATMENTPLAN, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const getTreatmentPlans = (userId) => async (dispatch) => {
    try {
        const {data} = await api.getTreatmentPlans(userId) 
        dispatch({type: GET_USER_TREATMENTPLANS, payload: data})   
    } catch (error) {
        console.log(error)
    }
}

export const getTreatmentPlanById = (tpid) => async (dispatch) => {
    try {
        const {data} = await api.getTreatmentPlanById(tpid) 
        dispatch({type: GET_TREATMENTPLAN_BYID, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const addTreatmentToTP = (formData) => async (dispatch) => {
    try {
        await api.addTreatmentToTP(formData)
    } catch (error) {
        console.log(error)
    }
}

export const getTreatmentById = (tid) => async (dispatch) => {
    try {
        const {data} = await api.getTreatmentById(tid)
        dispatch({type: GET_TREATMENT, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const updateTreatmentPlan = (tpid, formData, setErrors) => async (dispatch) => {
    try {
        const {data} = await api.updateTreatmentPlan(tpid, formData)
        if (data.message === 'treatment plan updated') {
            dispatch({type: UPDATE_TREATMENT_PLAN, payload: data})
            setErrors({general: ''})
            dispatch({type: HIDE_LOADING_SCREEN})
        } else if (data.message === 'something went wrong') {
            dispatch({type: HIDE_LOADING_SCREEN})
            setErrors({general: 'something went wrong'})
        }
    } catch (error) {
        console.log(error)
        dispatch({type: HIDE_LOADING_SCREEN})
        setErrors({general: 'something went wrong somewhere'})
    }
}

export const getTreatmentsByClientId = (clientid) => async (dispatch) => {
    try {
        const {data} = await api.getTreatmentsByClientId(clientid)
        dispatch({type: GET_TREATMENTS_BY_CLIENTID, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const getTreatmentsByTreatmentPlanId = (tpid) => async (dispatch) => {
    try {
        const { data } = await api.getTreatmentsByTreatmentPlanId(tpid)
        dispatch({type: GET_TREATMENTS_BY_TREATMENTPLANID, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const addTreatment = (form, setErrors, history) => async (dispatch) => {
    try {
        const { treatmentPlanId, clientId } = form
        const { data } = await api.addTreatment(form)

        if (data.message === 'treatment added successfully') {
            dispatch({type: ADD_TREATMENT, payload: data})
            dispatch({type: HIDE_LOADING_SCREEN})
            history.push(`/rmt/dashboard/patient/${clientId}/treatments/${treatmentPlanId}`)
        } else if (data.message === 'date is mandatory') {
            dispatch({type: HIDE_LOADING_SCREEN})
            setErrors({date: 'date is mandatory'})
        } else if (data.message === 'time is mandatory') {
            dispatch({type: HIDE_LOADING_SCREEN})
            setErrors({time: 'time is mandatory'})
        } else if (data.message === 'duration is mandatory') {
            dispatch({type: HIDE_LOADING_SCREEN})
            setErrors({duration: 'duration is mandatory'})
        } else if (data.message === 'something went wrong somewhere') {
            dispatch({type: HIDE_LOADING_SCREEN})
            setErrors({general: 'something went wrong somewhere'})
        } else if (data.message === 'something went wrong with inserting event') {
            dispatch({type: HIDE_LOADING_SCREEN})
            setErrors({general: 'something went wrong with inserting event'})
        } else if (data.message === 'something went wrong sending email') {
            dispatch({type: HIDE_LOADING_SCREEN})
            setErrors({general: 'something went wrong sending email'})
        }
    } catch (error) {
        dispatch({type: HIDE_LOADING_SCREEN})
        console.log(error)
        setErrors({general: `${error.message}`})
    }
}

export const updateTreatment = (tid, form) => async (dispatch) => {
    try {
        const { data } = await api.updateTreatment(tid, form)
        dispatch({type: UPDATE_TREATMENT, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const confirmTreatment = (tid, formData) => async (dispatch) => {

    const form = {
        reasonForMassage: formData?.data?.reasonForMassage,
        consents: {
            treatmentConsent: formData?.otherData?.consents?.treatmentConsent,
            glutesConsent: formData?.otherData?.consents?.glutesConsent,
            chestConsent: formData?.otherData?.consents?.chestConsent,
            abdomenConsent: formData?.otherData?.consents?.abdomenConsent,
            innerThighsConsent: formData?.otherData?.consents?.innerThighsConsent,
            areasToAvoid: formData?.otherData?.consents?.areasToAvoid
        },
        covid: {
            vaccinated: formData?.data?.covid?.vaccinated,
            noSymptoms: formData?.data?.covid?.noSymptoms,
            notIsolating: formData?.data?.covid?.notIsolating
        },
        notesFromClient: formData?.data?.notesFromClient 
    }

    try {
        const { data } = await api.updateTreatment(tid, form)
        dispatch({type: UPDATE_TREATMENT, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const getAllTreatments = () => async (dispatch) => {
    try {
        const {data} = await api.getAllTreatments()
        dispatch({type: GET_ALL_TREATMENTS, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const deleteTreatment = (tid, setErrors, patientId) => async (dispatch) => {
    try {
        const {data} = await api.deleteTreatment(tid, patientId)
        if (data.message === 'treatment deleted') {
            dispatch({type: DELETE_TREATMENT, payload: data.result})
            setErrors({})
            dispatch({type: HIDE_LOADING_SCREEN})
        } else if (data.message === 'treatment not deleted') {
            setErrors({general: 'treatment not deleted, try again'})
            console.log(data.error)
            dispatch({type: HIDE_LOADING_SCREEN})
        } else if (data.message === 'something went wrong') {
            setErrors({general: 'something went wrong'})
            console.log(data.error)
            dispatch({type: HIDE_LOADING_SCREEN})
        }
    } catch (error) {
        dispatch({type: HIDE_LOADING_SCREEN})
        console.log(error)
        setErrors({general: `${error.message}`})
    }
}