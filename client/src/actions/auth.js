import * as api from '../api'

import { AUTH, RMT_AUTH, USER_TYPE_VERIFICATION, SHOW_LOADER, HIDE_LOADER } from '../constants/actionTypes'

export const register = (formData, history) => async (dispatch) => {
    try {
        const {data} = await api.register(formData)       
        dispatch({ type: AUTH, data})
        history.push('/healthhistory')
    } catch (error) {
        console.log(error)
    }
    
}

export const login = (formData, history) => async (dispatch) => {
    try {
       const {data} = await api.login(formData)
       dispatch({ type: AUTH, data })
       history.push('/dashboard')
    } catch (error) {
        console.log(error)
    }
}

export const RMTRegister = (formData, history) => async (dispatch) => {
    try {
        const {data} = await api.RMTRegister(formData)
        dispatch({ type: RMT_AUTH, data})
        history.push('/rmt/dashboard')
    } catch (error) {
        console.log(error)
    }
} 

export const RMTLogin = (formData, history) => async (dispatch) => {
    try {
        const {data} = await api.RMTLogin(formData)
        dispatch({ type: RMT_AUTH, data})
        history.push('/rmt/dashboard')
    } catch (error) {
        console.log(error)
    }
} 

export const userTypeVerification = () => async (dispatch) => {
    try {
        const {data} = await api.userTypeVerification()
        dispatch({ type: USER_TYPE_VERIFICATION, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const showLoader = () => async (dispatch) => {
    dispatch({
        type: SHOW_LOADER,
    })
}

export const hideLoader = () => async (dispatch) => {
    dispatch({
        type: HIDE_LOADER,
    })
}