import * as api from '../api'

import { GET_USER_TREATMENTPLANS, CREATE_NEW_TREATMENTPLAN, GET_TREATMENTPLAN_BYID, GET_TREATMENT, UPDATE_TREATMENT, GET_TREATMENTS_BY_CLIENTID, GET_TREATMENTS_BY_TREATMENTPLANID, ADD_TREATMENT } from '../constants/actionTypes'

export const createNewTreatmentPlan = (tpForm, userId) => async (dispatch) => {
    try {
        const {data} = await api.createNewTreatmentPlan(tpForm, userId)
        console.log('create new tp', data)
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
        const result = await api.addTreatmentToTP(formData)
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

export const updateTreatmentPlan = (tpid, tid, formData) => async (dispatch) => {
    try {
        const {data} = await api.updateTreatmentPlan(tpid, tid, formData)
        dispatch({type: UPDATE_TREATMENT, payload: data})
    } catch (error) {
        console.log(error)
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

export const addTreatment = (form) => async (dispatch) => {
    try {
        const { data } = await api.addTreatment(form)
        dispatch({type: ADD_TREATMENT, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const updateTreatment = (tid, form) => async (dispatch) => {
    console.log('tid', tid)
    console.log('form', form)
    try {
        const { data } = await api.updateTreatment(tid, form)
        dispatch({type: UPDATE_TREATMENT, payload: data})
    } catch (error) {
        console.log(error)
    }
}