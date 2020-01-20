import { ReactElement } from 'react';
import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';

export interface ActionType {
    type: string,
    payload: any
}

export interface StateType {
    popup?: PopupStateType
}

export interface PopupStateType {
    component?: ReactElement;
    view?: EditorView;
    options?: any;
}

export interface ReactViewType {
    type: string;
    component: (view: EditorView, prevState: EditorState, reduxState: StateType) => ReactElement;
    view: EditorView;
    options?: any;
}

export interface PopupType {
    type: string;
    component: ReactElement;
    view?: EditorView;
    options?: any;
}
