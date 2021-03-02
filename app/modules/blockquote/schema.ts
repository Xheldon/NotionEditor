import { defaultParseDom, defaultSchemaAttrs } from '@utils/schema-helper';
import { DOMOutputSpec, Node } from 'prosemirror-model';

export const blockquote = {
    attrs: {
        ...defaultSchemaAttrs('blockquote')
    },
    content: 'block+',
    group: 'block',
    parseDOM: [
        { tag: 'blockquote' },
        defaultParseDom('blockquote')
    ],
    toDOM(node: Node): DOMOutputSpec { return ['div', node.attrs, 0] }
};