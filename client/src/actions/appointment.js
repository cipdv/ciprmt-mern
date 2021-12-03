import * as api from '../api'

import { SUBMIT_APPOINTMENT_FORM, GET_APPOINTMENTS, GET_APPOINTMENT, UPDATE_APPOINTMENT, ADD_APPOINTMENT } from '../constants/actionTypes'

export const submitAppointmentForm = (formData, history) => async (dispatch) => {
    try {
        const {data} = await api.submitAppointmentForm(formData)       
        dispatch({ type: SUBMIT_APPOINTMENT_FORM, data})
        history.push('/dashboard')
    } catch (error) {
        console.log(error)
    }
}

export const getAppointments = (userId) => async (dispatch) => {
    try {
        const {data} = await api.getAppointments(userId)
        dispatch({ type: GET_APPOINTMENTS, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const getAppointment = (userId) => async (dispatch) => {
    try {
        const {data} = await api.getAppointment(userId)
        dispatch({ type: GET_APPOINTMENT, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const updateAppointment = (userId, appointmentId, formData) => async (dispatch) => {
    try {
        const {data} = await api.updateAppointment(userId, appointmentId, formData)
        dispatch({ type: UPDATE_APPOINTMENT, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

//rmt add appointment
export const addAppointment = (userId, formData) => async (dispatch) => {
    try {
        const {data} = await api.addAppointment(userId, formData)
        dispatch({ type: ADD_APPOINTMENT, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

//user confirm appointment
export const confirmAppointment = (userId, appointmentId, formData) => async (dispatch) => {
    try {
        const {data} = await api.confirmAppointment(userId, appointmentId, formData)
        dispatch({ type: UPDATE_APPOINTMENT, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}