import {SET_PAGE} from '../constants/actionTypes';
import initialState from '../initialState';

export default function page (state = initialState.page, action) {
    switch (action.type) {
        case SET_PAGE:
            return action.page;
        default:
            return state;
    }
}

