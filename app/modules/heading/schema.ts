import { Node } from 'prosemirror-model';
import { defaultParseDom, defaultSchemaAttrs } from "@utils/schema-helper"

export const heading = {
    attrs: {
        ...defaultSchemaAttrs('heading'),
        level: {
            default: 1,
        }
    },
    content: '(text | image)*',
    group: 'block',
    defining: true,
    parseDOM: [
        { tag: 'h1', attrs: { level: 1 } },
        { tag: 'h2', attrs: { level: 2 } },
        { tag: 'h3', attrs: { level: 3 } },
        { tag: 'h4', attrs: { level: 4 } },
        { tag: 'h5', attrs: { level: 5 } },
        { tag: 'h6', attrs: { level: 6 } },
        defaultParseDom('heading'),
    ],
    toDOM(node: Node) {
        return ['div', {
            'data-type': node.attrs.level,
        }, 0]
    }
}