import { DOMOutputSpec, Node } from 'prosemirror-model';
import { defaultSchemaAttrs } from '@utils/schema-helper';

export const image = {
    inline: true,
    attrs: {
        ...defaultSchemaAttrs('image'),
        src: {},
        alt: { default: '' },
        title: { default: '' }
    },
    group: "inline",
    draggable: true,
    parseDOM: [{
        tag: "img[src]", getAttrs(dom: HTMLElement) {
            return {
                src: dom.getAttribute("src"),
                title: dom.getAttribute("title"),
                alt: dom.getAttribute("alt")
            }
        }
    }],
    toDOM(node: Node): DOMOutputSpec { return ["img", node.attrs] }
};