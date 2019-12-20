import { ActionType, PopupType } from '@interfaces';

export const SHOW_SLASH_POPUP = 'SHOW_SLASH_POPUP';

export const showPopup = (props: PopupType): ActionType => {
    const { type, component, view, options } = props;
    return {
        type,
        payload: {
            component,
            view,
            options
        }
    }
};