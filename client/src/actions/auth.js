import * as api from '../api'

import { AUTH, RMT_AUTH, USER_TYPE_VERIFICATION, SHOW_LOADER, HIDE_LOADER } from '../constants/actionTypes'

// export const register = (formData, history) => async (dispatch) => {
//     try {
//         const {data} = await api.register(formData)       
//         dispatch({ type: AUTH, data})
//         history.push('/healthhistory')

        
//     } catch (error) {
//         console.log(error)
//     }
// }

export const register = (formData, history, setErrors) => async (dispatch) => {
    try {
        const {data} = await api.register(formData)       

        if (data.message === 'registration successful') {
            dispatch({ type: AUTH, data})
            history.push('/healthhistory')
        } else if (data.message === `passwords don't match`) {
            setErrors({confirmPassword: 'Passwords do not match'})
            dispatch({type: HIDE_LOADER})
        } else if (data.message === 'user already exist') {
            setErrors({email: 'User already exists'})
            dispatch({type: HIDE_LOADER})
        }
    } catch (error) {
        console.log(error)
    }
}

export const login = (formData, history, setErrors) => async (dispatch) => {
    try {
       const {data} = await api.login(formData)
       if (data.message === 'login successful') {
            dispatch({ type: AUTH, data })
            history.push('/dashboard')
       } else if (data.message === 'invalid password') {
            setErrors({password: 'Password is incorrect'})
            dispatch({type: HIDE_LOADER})
       } else if (data.message === `user doesn't exist`) {
            setErrors({email: 'Email address is incorrect. Check spelling and capitals.'})
            dispatch({type: HIDE_LOADER})
       }
       
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