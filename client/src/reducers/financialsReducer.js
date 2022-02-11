import { ADD_INCOME, ADD_EXPENSE, ADD_TRANSACTION, GET_FINANCIAL_DATA, GET_FINANCIAL_STATEMENTS, GET_EXPENSES, GET_INCOMES } from "../constants/actionTypes";

const financialsReducer = (state={ financialState: [], financialStatements: [], income: [], expenses: [] }, action) => {
    switch (action.type) {
        case ADD_TRANSACTION:
            return { ...state, financialState: action.payload }
        case GET_FINANCIAL_DATA: 
            return { ...state, financialState: action.payload }
        case GET_FINANCIAL_STATEMENTS:
            return { ...state, financialStatements: action.payload}
        case ADD_INCOME:
            return { ...state, income: [...action.payload]}
        case ADD_EXPENSE:
            return { ...state, expenses: [...action.payload]}
        case GET_INCOMES:
            return { ...state, income: action.payload}
        case GET_EXPENSES:
            return { ...state, expenses: action.payload}
        default:
            return state
    }
}

export default financialsReducer 