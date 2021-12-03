import { ADD_TRANSACTION, GET_FINANCIAL_DATA } from "../constants/actionTypes";

const financialsReducer = (state={ financialState: [] }, action) => {
    switch (action.type) {
        case ADD_TRANSACTION:
            return { ...state, financialState: action.payload }
        case GET_FINANCIAL_DATA: 
            return { ...state, financialState: action.payload }
        default:
            return state
    }
}

export default financialsReducer 