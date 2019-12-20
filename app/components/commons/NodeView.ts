/*
* TODO: NodeView's simple implement, not using
* */

import { Decoration, EditorView } from 'prosemirror-view';
import { ReactElement } from 'react';

import { ReactView } from '@abstract/ReactView';

export class NodeView extends ReactView<Node, Decoration[]> {
    type: string;
    node: any;
    view: EditorView;
    options: object;
    constructor(props: any) {
        super();
        const { type, node, view, options } = props;
        this.type = type;
        this.node = node;
        this.view = view;
        this.options = options;
        this.update(node, null);
    }
    update(node: Node, decoration: Decoration[]): void {

        // pass the view to calculate the popup's position
        let updateComponent: ReactElement;
    };
}