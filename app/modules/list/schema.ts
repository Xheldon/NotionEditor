import { Node, DOMOutputSpec } from "prosemirror-model";
import {hasType, defaultParseDom, defaultSchemaAttrs} from '@utils/schema-helper';
export const ul = {
    attrs: {
        ...defaultSchemaAttrs('bullet-list'),
    },
    group: 'block',
    defining: true,
    content: 'list_item+',
    parseDOM: [
        defaultParseDom('bullet-list'),
    ],
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
        ...defaultSchemaAttrs('order-list'),
    },
    group: 'block',
    defining: true,
    content: 'list_item+',
    parseDOM: [
        defaultParseDom('order-list')
    ],
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

export const list_item = {
    attrs: {
        ...defaultSchemaAttrs('list-item'),
    },
    group: 'list_item',
    defining: true,
    content: 'paragraph block*',
    parseDOM: [
        defaultParseDom('list-item')
    ],
    toDOM(node: Node): DOMOutputSpec {
        return ['div', node.attrs, 0];
    }
}
