import { SET_PAGE } from '../constants/actionTypes';

export function setPage(page) {
    return dispatch => {
        dispatch({ type: SET_PAGE, page });
    };
}
