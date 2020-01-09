import {DOMOutputSpec, Node } from 'prosemirror-model';

export const doc = {
    content: '(section | block)+'
};

export const section = {
    attrs: {
        class: {
            default: 'n-section'
        },
        type: {
            default: 'section'
        },
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

// textblock 是唯一能够直接包含 text 的元素
export const textBlock = {
    attrs: {
        class: {
            default: 'n-text-block'
        },
        type: {
            default: 'text-block'
        },
        style: {
            default: ''
        },
        'n-atom': {
            default: ''
        }
    },
    group: 'textBlock',
    content: 'inline*',
    toDOM(node: Node): DOMOutputSpec {
        return ['div', node.attrs, 0]
    }
};

export const text = {
    group: 'inline'
};