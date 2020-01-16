/**
 * 此文件用来获取 module 的绝对位置
 */
import { EditorState } from 'prosemirror-state';
import { ResolvedPos } from 'prosemirror-model';

// 因为只有 list 和 paragraph 能够包含 block, 因此专门需要找到他们的起始位置, 以方便后续操作
export function findAllListAndParagraphPos($pos: ResolvedPos) {
    const thisNode = $pos.before(-1);
    if (thisNode != null) {
        const $thisNode = $pos.doc.resolve(thisNode);
        const siblingPreviousNode = $thisNode.parent.childBefore($thisNode.parentOffset);
    }
}

// 找到当前 resolvedPos 所在的 block 之前的兄弟 block 的最后一个 textblock, 用来处理在首位删除的操作
export function findLastTextblockPosInPreviousSiblingBlockNode($pos: ResolvedPos) {
    // 获取当前 $pos 的 block 起始位置
    const thisNode = $pos.before(-1);
    if (thisNode != null) {
        // resolve 这个 block 的起始位置为 resolvedPos
        const $thisNode = $pos.doc.resolve(thisNode);
        // 获取该 block 上一个 block 的 node
        const siblingPreviousNode = $thisNode.parent.childBefore($thisNode.parentOffset);
        console.log('上一个:', siblingPreviousNode);
        // 获取上一个 block 的 pos
        const siblingPreviousNodePos = thisNode - siblingPreviousNode.node.nodeSize;

    }
}
