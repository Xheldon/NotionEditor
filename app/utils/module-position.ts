/**
 * 此文件用来获取 module 的绝对位置
 */
import { EditorState } from 'prosemirror-state';

export function findLastTextblockPosInPreviousSiblingBlockNode(state: EditorState) {
    const selection = state.selection;
    const $from = selection.$from;
    const $to = selection.$to;

}
