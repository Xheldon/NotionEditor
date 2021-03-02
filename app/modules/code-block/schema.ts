import { defaultParseDom, defaultSchemaAttrs } from '@utils/schema-helper';
import { Node, DOMOutputSpec } from 'prosemirror-model';

export const code_block = {
    attrs: {
        ...defaultSchemaAttrs('code-block'),
    },
    content: 'text*',
    group: 'block',
    code: true,
    defining: true,
    marks: '',
    parseDOM: [
        defaultParseDom('code-block'),
        {
            tag: 'pre',
            preserveWhitespace: 'full' as "full",
            getAttrs: (node: HTMLElement) => ({
                params: node.getAttribute('data-params') || ''
            })
        }
    ],
    toDOM(node: Node): DOMOutputSpec {
        // Note: use 'div' instead
        return ['pre', node.attrs.params ? {'data-params': node.attrs.params} : {}, ['code', 0]]
    }
  }