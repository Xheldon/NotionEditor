import { combineReducers } from 'redux';

import { ActionType, PopupStateType } from '@interfaces';
import { SHOW_SLASH_POPUP, SELECT_SLASH_POPUP, CREATE_OR_UPDATE_SLASH_POPUP } from '@redux/actions';


const popup = (state: PopupStateType = {}, action: ActionType) => {
    console.log('popup:', action);
    switch (action.type) {
        case SHOW_SLASH_POPUP:
        case SELECT_SLASH_POPUP:
        case CREATE_OR_UPDATE_SLASH_POPUP:
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