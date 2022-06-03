import { HIDE_LOADING_SCREEN, SHOW_LOADING_SCREEN } from '../constants/actionTypes'

const loadingReducer = (state = { loading: false }, action) => {
    switch (action.type) {
        case SHOW_LOADING_SCREEN:
            return { ...state, loading: true}
        case HIDE_LOADING_SCREEN:
            return { ...state, loading: false}
        default:
            return state
    }
}

export default loadingReducer