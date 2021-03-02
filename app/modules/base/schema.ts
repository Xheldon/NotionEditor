import {DOMOutputSpec, Node } from 'prosemirror-model';
import { defaultSchemaAttrs } from '@utils/schema-helper'

export const doc = {
    content: '(block | section)+'
};

export const section = {
    attrs: {
        ...defaultSchemaAttrs('section'),
        style: {
            default: 'display: flex;'
        }
    },
    group: 'section',
    content: 'block+',
    toDOM(node: Node): DOMOutputSpec {
        return ['div', node.attrs, 0]
    }
};

export const text = {
    group: 'inline',
};