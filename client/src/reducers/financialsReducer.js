import { ADD_TRANSACTION, GET_FINANCIAL_DATA, GET_FINANCIAL_STATEMENTS } from "../constants/actionTypes";

const financialsReducer = (state={ financialState: [], financialStatements: [] }, action) => {
    switch (action.type) {
        case ADD_TRANSACTION:
            return { ...state, financialState: action.payload }
        case GET_FINANCIAL_DATA: 
            return { ...state, financialState: action.payload }
        case GET_FINANCIAL_STATEMENTS:
            return { ...state, financialStatements: action.payload}
        default:
            return state
    }
}

export default financialsReducer 