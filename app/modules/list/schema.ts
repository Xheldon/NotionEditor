import { Node, DOMOutputSpec } from "prosemirror-model";

export const ul = {
    attrs: {
        class: {
            default: 'n-unordered-list'
        },
        style: {
            default: ''
        }
    },
    group: 'block',
    content: '(textBlock | block | intendBlock)+',
    toDOM(node: Node): DOMOutputSpec {
        //TODO: only put partial attrs on dom
        return [
            'div',
            node.attrs,
            [
                'div', '' + (node.attrs.order || 1)
            ],
            [
                'div', 0
            ]
        ]
    }
};
