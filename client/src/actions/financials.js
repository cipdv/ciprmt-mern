import * as api from '../api'
import { GET_INCOMES, GET_EXPENSES, ADD_TRANSACTION, GET_FINANCIAL_DATA, ADD_NEW_FINANCIAL_STATEMENT, GET_FINANCIAL_STATEMENTS, ADD_INCOME, ADD_EXPENSE } from '../constants/actionTypes'

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
        // const { data } = await api.addFinancials(formData)
        console.log(formData)
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

export const addIncome = (rmtid, financialData) => async (dispatch) => {
    try {
        const {data} = await api.addIncome(rmtid, financialData)
        dispatch({type: ADD_INCOME, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const addExpense = (rmtid, financialData) => async (dispatch) => {
    try {
        const {data} = await api.addExpense(rmtid, financialData)
        dispatch({type: ADD_EXPENSE, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const getIncomes = (year) => async (dispatch) => {
    try {
        const {data} = await api.getIncomes(year)
        dispatch({type: GET_INCOMES, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const getExpenses = (year) => async (dispatch) => {
    try {
        const {data} = await api.getExpenses(year)
        dispatch({type: GET_EXPENSES, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}