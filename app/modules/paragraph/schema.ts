import {Node, DOMOutputSpec, AttributeSpec} from 'prosemirror-model';
import {hasType, defaultParseDom, defaultSchemaAttrs} from '@utils/schema-helper';
// p can contain indentP and textBlock as it child, and textBlock has it's text content, indendP has it's block child;
export const paragraph = {
    attrs: {
        ...defaultSchemaAttrs('paragraph'),
    },
    content: 'inline*',
    group: 'block',
    parseDOM: [
        defaultParseDom('paragraph'),
    ],
    toDOM(node: Node): DOMOutputSpec {
        return ['div', node.attrs, 0];
    }
};