import * as api from '../api'
import { ADD_TRANSACTION, GET_FINANCIAL_DATA, ADD_NEW_FINANCIAL_STATEMENT, GET_FINANCIAL_STATEMENTS } from '../constants/actionTypes'

export const addTransaction = (RMTid, financialData) => async (dispatch) => {
    try {
        const { data } = await api.addTransaction(RMTid, financialData)
        dispatch({ type: ADD_TRANSACTION, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

export const getFinancialData = (year) => async (dispatch) => {
    try {
        const { data } = await api.getFinancialData(year)
        dispatch({ type: GET_FINANCIAL_DATA, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const addFinancials = (formData) => async (dispatch) => {
    try {
        const { data } = await api.addFinancials(formData)
    } catch (error) {
        console.log(error.message)
    }
}

export const createNewFinancialStatement = (rmtid, year) => async (dispatch) => {
    try {
        const { data } = await api.createNewFinancialStatement(rmtid, year)
        dispatch({type: ADD_NEW_FINANCIAL_STATEMENT, payload: data})
    } catch (error) {
        
    }
}

export const getFinancialStatementsByRMTId = (rmtid) => async (dispatch) => {
    try {
        const { data } = await api.getFinancialStatementsByRMTId(rmtid)
        dispatch({type: GET_FINANCIAL_STATEMENTS, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const addTransactionToFinancialStatement = (fsid) => async (dispatch) => {
    try {
        
    } catch (error) {
        
    }
}