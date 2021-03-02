import { DOMOutputSpec, Mark, Node } from 'prosemirror-model'

export const marks = {
    em: {
        parseDOM: [{ tag: "i" }, { tag: "em" },
        { style: "font-style", getAttrs: (value: any): any => value == "italic" && null }],
        toDOM(): DOMOutputSpec { return ["em"] }
    },

    strong: {
        parseDOM: [{ tag: "b" }, { tag: "strong" },
        { style: "font-weight", getAttrs: (value: any): any => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null }],
        toDOM(): DOMOutputSpec { return ["strong"] }
    },

    link: {
        attrs: {
            href: {},
            title: { default: '' }
        },
        inclusive: false,
        parseDOM: [{
            tag: "a[href]", getAttrs(dom: HTMLElement) {
                return { href: dom.getAttribute("href"), title: dom.getAttribute("title") }
            }
        }],
        toDOM(node: Mark): DOMOutputSpec { return ["a", node.attrs] }
    },

    code: {
        parseDOM: [{ tag: "code" }],
        toDOM(): DOMOutputSpec { return ["code"] }
    }
}