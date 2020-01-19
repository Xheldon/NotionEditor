import { Node, DOMOutputSpec } from "prosemirror-model";

export const ul = {
    attrs: {
        class: {
            default: 'n-unordered-list'
        },
        type: {
            default: 'un-order-list'
        },
        style: {
            default: ''
        }
    },
    group: 'block',
    defining: true,
    content: 'textBlock block*',
    toDOM(node: Node): DOMOutputSpec {
        //TODO: only put partial attrs on dom
        return [
            'div',
            node.attrs,
            [
                'div', '·'
            ],
            [
                'div', 0
            ]
        ]
    }
};

export const ol = {
    attrs: {
        class: {
            default: 'n-ordered-list'
        },
        type: {
            default: 'order-list'
        },
        style: {
            default: ''
        }
    },
    group: 'block',
    defining: true,
    content: 'textBlock block*',
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
