import { defaultParseDom, defaultSchemaAttrs } from '@utils/schema-helper';
import { DOMOutputSpec } from 'prosemirror-model';


export const hr = {
    attrs: {
        ...defaultSchemaAttrs('hr'),
    },
    group: 'block',
    parseDOM: [
        { tag: 'hr' },
        defaultParseDom('hr'),
    ],
    toDOM(): DOMOutputSpec { return ['div', ['hr']] }
}