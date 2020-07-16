import { ActionType } from '@interfaces';
import { ReactElement } from 'react';
import { EditorView } from 'prosemirror-view';

import SlashPopupView from '@components/slash/slash-popup';

export const SHOW_SLASH_POPUP = 'SHOW_SLASH_POPUP';
export const SELECT_SLASH_POPUP = 'SELECT_SLASH_POPUP';
export const CREATE_OR_UPDATE_SLASH_POPUP = 'CREATE_OR_UPDATE_SLASH_POPUP';



/**
 * 每个 action 的参数不一样, 因此 props 的 type 直接写死
 * 每个 action 对应一个 component 的状态控制, 因此 component 写死, props 只传入参数
 */
export const showPopup = (props: {
    type: string;
    component: ReactElement;
    view?: EditorView;
    options?: any;
}): ActionType => {
    const { type, component, view, options } = props;
    return {
        type,
        payload: {
            component,
            view,
            options,
            type
        }
    }
};

export const selectInsert = (props: {
    type: string;
    options?: any;
}): ActionType => {
    const { type, options } = props;
    return {
        type,
        payload: {
            options
        }
    }
};

export const createOrUpdateSlashPopup = (props: {
    type: string;
    options?: any;
}): ActionType => {
    const { type, options } = props;
    return {
        type,
        payload: {
            component:
            options
        }
    }
};
