import { ReactElement } from 'react';
import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';

export interface ActionType {
    type: string,
    payload: any
}

/**
 * state 的数据结构:
 * state {
 *     popup: {
 *         component: ReactElement; 预置的
 *         currentIndex: number; 当前激活 list 的哪个项
 *         show: boolean; 触发的时候由 action 设置
 *         options: any; 由 ProseMirror 提供
 *     }
 * }
 */

export interface StateType {
    popup?: PopupStateType
}

export interface PopupStateType {
    options?: any;
    currentIndex?: number;
}

export interface ReactViewType {
    type: string;
    component: (view: EditorView, prevState: EditorState, reduxState: StateType) => ReactElement;
    view: EditorView;
    options?: any;
}

