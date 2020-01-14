import { EditorState } from "prosemirror-state";

export function isInTextBlock(state: EditorState): boolean {
    const $from = state.selection.$from;
    const $to = state.selection.$to;
    if ($from.parent.type === $to.parent.type && $from.parent.type === state.schema.nodes.textBlock) return true;
    return false;
}

export function isInParagraph(state: EditorState): boolean {
    const $from = state.selection.$from;
    if ($from.node(-1).type === state.schema.nodes.p) return true;
    return false;
}