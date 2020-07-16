import { EditorState, Selection, TextSelection, NodeSelection, AllSelection } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { ResolvedPos } from "prosemirror-model";

import { isInTextBlock, isInCodeBlock, isInList } from '@utils/module-location';
import { findLastTextblockPosInPreviousSiblingBlockNode } from '@utils/module-position';
import { getSlashStatus, getState } from '@redux/selector';
import { rdxDispatch } from '@redux/store';
import { selectInsert } from '@redux/actions';

export default {
    Enter: (state: EditorState, dispatch: Function, view: EditorView) => {
        const selection: Selection = state.selection;
        const $from: ResolvedPos = selection.$from;
        const $to: ResolvedPos = selection.$to;
        const tr = state.tr;
        // 获取 nodesType 映射
        const _nodes = state.schema.nodes;
        if (getSlashStatus()) {
            // slash 出现的时候是选择插入状态, 按下 enter 的时候一定是光标状态, 且一定在 textblock 中, 因此按下 enter 会插入不同类型的 block
            console.log('getState:', getState());
        } else {
            // 如果在非 list 中, 则在当前节点同级直接插入一个新的 paragraph
            // 需要考虑光标在的位置之后是否有内容, 有的话需要将其放入新 paragraph 中
            if (isInTextBlock(state)) {
                // 获取到当前文本块节点的父级的后面位置
                const insertPos = $from.after(-1);
                // 获取当前文本节点的最后位置
                const end = $from.end();
                // 得到当前选区结束位置到最后的部分生成 slice
                const slice = state.doc.slice($to.pos, end);
                const currentNode = $from.node(-1);
                let insertNode = null;
                if (isInCodeBlock(state)) {
                    tr.delete($from.pos, $to.pos);
                    // 在 codeblock 中, 仅换行即可, 因此插入一个换行符
                    // text ndde 的创建方式跟其他的 node 不同, 不能用 constructor 创建
                    tr.insert(tr.mapping.map($to.pos), state.schema.text('\n'));
                } else {
                    if (isInList(state)) {
                        // 在 ul 中, 换行后在下一行插入一个 li
                        // 在 ol 中, 换行后在下一行插入一个 li, 同时读取当前 li 的 order 属性, 并 +1
                        // 在 todo 中, 换行后在下一行插入一个 li
                        // NOTE: 因为插入后的节点跟当前节点是一个类型, 因此也可以考虑插入一个 slice, 设置好 open 和 close 的深度即可, 此处常规处理, 即找到插入点, 插入一个 node
                        if (currentNode.type !== _nodes.ol) {
                            insertNode = _nodes[currentNode.type.name].create(null, _nodes.textBlock.create(null, slice.content));    
                        } else {
                            const currentOrder = currentNode.attrs.order || 1;
                            insertNode = _nodes.ol.create(null, _nodes.textBlock.create({
                                order: currentOrder + 1
                            }, slice.content));  
                        }
                    } else {
                        // 此时应该位于普通非原子节点的 block 中, 如 blockquote, heading 等
                        // 构建一个 paragraph, 将 slice 的 content 当做其内容, 此处可以直接写 create, 也可以使用 findWrapper 工具函数
                        // 二者的属性都使用默认值
                        insertNode = _nodes.p.create(null, _nodes.textBlock.create(null, slice.content));
                    }
                     // 然后删除从 from 到 end 的内容
                     tr.delete($from.pos, end);
                     // 因为之前的 delete 操作, 需要 mapping pos
                     const mappedPos = tr.mapping.map(insertPos);
                    // 插入
                    tr.insert(mappedPos, insertNode);
                    // 此时已经插入成功, 但是光标还在上面, 因此移动这个光标(新建一个 TextSelection 即可)
                    tr.setSelection(TextSelection.create(tr.doc, mappedPos + 2));
                    dispatch(tr.scrollIntoView());
                    return true;
                }
            } else if (selection instanceof NodeSelection || selection instanceof AllSelection) {
                // 否则理论上应该会有其他模块处理选区, 当前选区应该是 nodeblock, 则在其下插入一个 paragraph
                tr.insert($to.pos + 2, _nodes.p.create(null, _nodes.textBlock.create(null, _nodes.text.create(null, ''))));
                return true;
            }
        }
        return false;
    },
    Backspace: (state: EditorState, dispatch: Function, view: EditorView) => {
        console.log('trigger');
        // Backspace 只处理最基本的 paragraph 内容的删除, 且假设其前后都是 paragraph
        // 其他的如在第一个位置按删除键后该如何处理, 则是其他 module 的任务
        const selection: Selection = state.selection;
        const $from = selection.$from;
        const $to = selection.$to;
        const tr = state.tr;
        // 如果选区首尾都在 textblock 中
        if (isInTextBlock(state)) {
            // 如果是光标, 则删除前一个位置
            if ((<TextSelection>selection).$cursor) {
                if ($from.textOffset > 0) {
                    tr.delete($from.pos - 1, $from.pos);
                    tr.setSelection(TextSelection.create(tr.doc, tr.mapping.map($from.pos)));
                    dispatch(tr);
                    return true;
                } else {
                    // 当前光标在首位, 按删除键需要将当前文本节点的内容附加到上一个 paragraph 的文本块末尾
                    // 如果上一个 paragraph 是复杂形式, 即其不但含有 textblock, 还含有 block, 则将 $from 所在的文本放到上一个 paragraph 的最后一个含有文本节点的子 block 的末尾
                    // 应该需要一个通用函数叫 findLastTextblockPosInPreviousBlockNode 然后用最后一个文本块的结束位置插入即可
                    console.log('beckspace:', $from.pos);
                    let textBlockPos = findLastTextblockPosInPreviousSiblingBlockNode($from);
                    if (textBlockPos) {
                        let $textBlock = $from.doc.resolve(textBlockPos);
                        let insertPos = textBlockPos + $textBlock.nodeAfter.content.size + 1;
                        
                    }
                }
            }
        } else {

        }
    },
    ArrowUp: (state: EditorState, dispatch: Function, view: EditorView) => {
        // TODO: 当 slash 出现的时候, 操作选项框
        if (getSlashStatus()) {
            rdxDispatch(selectInsert({
                type: 'SELECT_SLASH_POPUP',
                options: {
                    currentSelect: 'insertparagraph'
                }
            }));
            dispatch(state.tr);
            return true;
        }
        return false;
    },
    ArrowDown: (state: EditorState, dispatch: Function, view: EditorView) => {
        // TODO: 当 slash 出现的时候, 操作选项框
        // TODO: 当 slash 出现的时候, 操作选项框
        if (getSlashStatus()) {
            rdxDispatch(selectInsert({
                type: 'SELECT_SLASH_POPUP',
                options: {
                    currentSelect: 'insertparagraph'
                }
            }));
            dispatch(state.tr);
            return true;
        }
        return false;
    }
}
