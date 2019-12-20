import {Node, DOMOutputSpec, AttributeSpec} from 'prosemirror-model';

export const intendBlock = {
    attrs: {
        class: {
            default: 'n-indent-block'
        },
        style: {
            default: 'padding-left: 30px;'
        }
    },
    group: 'intendBlock',
    content: 'block+',
    toDOM(node: Node): DOMOutputSpec {
        return ['div', node.attrs, 0]
    }
};

// p can contain indentP and textBlock as it child, and textBlock has it's text content, indendP has it's block child;
export const p = {
    attrs: {
        class: {
            default: 'n-p'
        },
        style: {
            default: ''
        }
    },
    group: 'block',
    content: '(textBlock | intendBlock){1}',
    marks: '_',
    toDOM(node: Node): DOMOutputSpec {
        return ['div', node.attrs, 0];
    }
};