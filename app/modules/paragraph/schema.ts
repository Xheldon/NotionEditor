import {Node, DOMOutputSpec, AttributeSpec} from 'prosemirror-model';

// p can contain indentP and textBlock as it child, and textBlock has it's text content, indendP has it's block child;
export const p = {
    attrs: {
        class: {
            default: 'n-p'
        },
        type: {
            default: 'paragraph'
        },
        style: {
            default: ''
        }
    },
    group: 'block',
    content: 'textBlock block*',
    marks: '_',
    toDOM(node: Node): DOMOutputSpec {
        return ['div', node.attrs, 0];
    }
};