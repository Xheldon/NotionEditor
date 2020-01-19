import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';
import { ReactElement } from 'react';

import { ReactViewType } from '@interfaces';
import store, { rdxDispatch } from '@redux/store';
import { showPopup } from '@redux/actions';
import { ReactView } from '@abstract/ReactView';
import { StateType } from '@redux/interface';

export class View extends ReactView<EditorView, EditorState> {
    type: string;
    component: (view: EditorView, prevState: EditorState, reduxState: StateType) => ReactElement;
    view: EditorView;
    options: object;
    constructor(props: ReactViewType) {
        super();
        const { type, component, view, options } = props;
        this.type = type;
        this.component = component;
        this.view = view;
        this.options = options;
        this.update(view, null);
    }
    update(view: EditorView, prevState: EditorState): void {

        // pass the view to calculate the popup's position
        let updateComponent: ReactElement;
        updateComponent = this.component(view, prevState, store.getState());
        rdxDispatch(showPopup({
            type: this.type,
            component: updateComponent,
            view: view,
            options: this.options
        }));
    };
}