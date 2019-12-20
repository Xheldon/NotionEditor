import { combineReducers } from 'redux';

import { ActionType, PopupStateType } from '@interfaces';
import { SHOW_SLASH_POPUP } from '@redux/actions';


const popup = (state: PopupStateType = {}, action: ActionType) => {
    switch (action.type) {
        case SHOW_SLASH_POPUP:
            return {
                ...state,
                ...action.payload // use the text to filter the options for user selected
            };
        default:
            return state;
    }
};

export default combineReducers({
    popup
});