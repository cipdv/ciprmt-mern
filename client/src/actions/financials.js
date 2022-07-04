import * as api from '../api'
import { GET_INCOME_BY_YEAR_AND_MONTH, GET_INCOMES, GET_EXPENSES, ADD_TRANSACTION, GET_FINANCIAL_DATA, ADD_NEW_FINANCIAL_STATEMENT, GET_FINANCIAL_STATEMENTS, ADD_INCOME, ADD_EXPENSE, HIDE_LOADING_SCREEN } from '../constants/actionTypes'

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

export const addToFinancials = (formData, setErrors) => async (dispatch) => {
    try {
        const { data } = await api.addToFinancials(formData)
        if ( data.type === 'expense') {
            dispatch({ type: HIDE_LOADING_SCREEN})
            dispatch ({ type: ADD_EXPENSE, payload: data.result})
        } else if (data.type === 'income') {
            dispatch({ type: HIDE_LOADING_SCREEN})
            dispatch({ type: ADD_INCOME, payload: data.result})
        } else if (data.message === 'error') {
            dispatch({ type: HIDE_LOADING_SCREEN})
            setErrors({general: 'something went wrong'})
        }
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

export const getIncomeByMonthAndYear = (body) => async (dispatch) => {

    const {year, month} = body

    try {
        const {data} = await api.getIncomeByMonthAndYear(year, month)
        dispatch({type: GET_INCOME_BY_YEAR_AND_MONTH, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}