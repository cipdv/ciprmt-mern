import * as api from '../api'

//import action constants
import { GET_ALL_USERS, SUBMIT_HH, GET_USER, SEARCH_USERS, UPDATE_USER, ADD_HEALTH_HISTORY, GET_HEALTH_HISTORY } from '../constants/actionTypes'

//submit health history form
export const submitHH = (formData) => async (dispatch) => {
    try {
        const { data } = await api.submitHH(formData)
        dispatch({type: SUBMIT_HH, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const addNewHealthHistory = (form) => async (dispatch) => {
    try {
        const { data } = await api.addNewHealthHistory(form)
        console.log(data)
        dispatch({type: ADD_HEALTH_HISTORY, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const getClientHealthHistory = (clientId) => async (dispatch) => {
    try {
        const { data } = await api.getClientHealthHistory(clientId)
        dispatch({type: GET_HEALTH_HISTORY, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

//get all users' name, email, phone
export const getAllUsers = () => async (dispatch) => {
    try {
        const {data} = await api.getAllUsers()
        dispatch({type: GET_ALL_USERS, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

//search for user by name
export const searchUsers = (searchQuery) => async (dispatch) => {
    try {
        const { data: {data} } = await api.searchUsers(searchQuery)
        dispatch({type: SEARCH_USERS, payload: data})
    } catch (error) {
        console.log(error)
    }
}

//get a single user's health history list
export const getUser = (userId) => async (dispatch) => {
    try {
        const result = await api.getUser(userId)
        dispatch({type: GET_USER, payload: result})
    } catch (error) {
        console.log(error.message)
    }
}

//update a user and add their signature
export const updateUser = (userId, signature) => async (dispatch) => {
    try {
        const result = await api.updateUser(userId, signature)
        dispatch({type: UPDATE_USER, payload: result})
    } catch (error) {
        console.log(error.message)
    }
}

//new hh actions
//add a health history
