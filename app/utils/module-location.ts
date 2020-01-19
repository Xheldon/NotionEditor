/**
 * 此文件用来帮助定位光标在哪个 module 中
 */

import { EditorState, TextSelection } from 'prosemirror-state';

const listType = ['ul', 'ol', 'todo']

export function isInTextBlock(state: EditorState): boolean {
    const $from = state.selection.$from;
    const $to = state.selection.$to;
    const selection = state.selection;
    if ($from.parent.type === $to.parent.type && $from.parent.type === state.schema.nodes.textBlock && selection instanceof TextSelection) return true;
    return false;
}

export function isInParagraph(state: EditorState): boolean {
    const $from = state.selection.$from;
    if ($from.node(-1).type === state.schema.nodes.p) return true;
    return false;
}

export function isInList(state: EditorState): boolean {
    const selection = state.selection;
    const $from = selection.$from;
    return isInTextBlock(state) && listType.includes($from.node(-1).type.name);
}

export function isInCodeBlock(state: EditorState): boolean {
    const selection = state.selection;
    const $from = selection.$from;
    return isInTextBlock(state) && $from.node(-1).type === state.schema.nodes.code;
}
