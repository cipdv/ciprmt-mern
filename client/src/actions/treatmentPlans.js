import * as api from '../api'

import { GET_USER_TREATMENTPLANS, CREATE_NEW_TREATMENTPLAN, GET_TREATMENTPLAN_BYID, GET_TREATMENT } from '../constants/actionTypes'

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
