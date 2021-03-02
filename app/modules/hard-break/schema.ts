import { DOMOutputSpec } from 'prosemirror-model'

export const hard_break = {
    inline: true,
    group: 'inline',
    selectable: false,
    parseDOM: [{ tag: 'br' }],
    toDOM(): DOMOutputSpec { return ['br'] }
}