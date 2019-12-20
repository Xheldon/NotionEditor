import {DOMOutputSpec, Node } from 'prosemirror-model';

export const doc = {
    content: '(block | multiBlock)+'
};

// multi can contain other blocks as like these are inlineBlock
export const multiBlock = {
    attrs: {
        class: {
            default: 'n-multi-block'
        },
        style: {
            default: 'display: flex;'
        }
    },
    group: 'multiBlock',
    content: 'block+',
    toDOM(node: Node): DOMOutputSpec {
        return ['div', node.attrs, 0]
    }
};

// block can contain other section, like list, p, blockquote, etc
/*
export const block = {
    attrs: {
        class: {
            default: 'n-block'
        },
        style: {
            default: ''
        }
    },
    group: 'block',
    content: 'section+',
    toDOM(node: Node): DOMOutputSpec {
        return ['div', node.attrs, 0]
    }
};
*/

// textblock is the only type that contain inline text
export const textBlock = {
    attrs: {
        class: {
            default: 'n-text-block'
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