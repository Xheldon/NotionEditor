import { ActionType, PopupType, SelectType } from '@interfaces';

export const SHOW_SLASH_POPUP = 'SHOW_SLASH_POPUP';
export const SELECT_SLASH_POPUP = 'SELECT_SLASH_POPUP';

export const showPopup = (props: PopupType): ActionType => {
    const { type, component, options } = props;
    return {
        type,
        payload: {
            component,
            options,
            type
        }
    }
};

export const selectInsert = (props: SelectType): ActionType => {
    const { type, options } = props;
    return {
        type,
        payload: {
            options
        }
    }
}
