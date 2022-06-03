import { SHOW_LOADING_SCREEN, HIDE_LOADING_SCREEN } from '../constants/actionTypes'

export const showLoadingScreen = () => async (dispatch) => {
    dispatch({
        type: SHOW_LOADING_SCREEN,
    })
}

export const hideLoadingScreen = () => async (dispatch) => {
    dispatch({
        type: HIDE_LOADING_SCREEN,
    })
}