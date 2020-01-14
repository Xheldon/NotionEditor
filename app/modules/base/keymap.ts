import { EditorState, Selection, TextSelection, NodeSelection } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

import { isInTextBlock } from '@utils/module-location';
import { ResolvedPos } from "prosemirror-model";
import { Fragment } from "react";

export default {
    Enter: (state: EditorState, dispatch: Function, view: EditorView) => {
        const selection: Selection = state.selection;
        const $from: ResolvedPos = selection.$from;
        const $to: ResolvedPos = selection.$to;
        const tr = state.tr;
        // 如果在非 list 中, 则在当前节点同级直接插入一个新的 paragraph
        // 需要考虑光标在的位置之后是否有内容, 有的话需要将其放入新 paragraph 中
        if (selection instanceof TextSelection && isInTextBlock(state)) {
            // 获取到当前文本块节点的父级的后面位置
            const insertPos = $from.after(-1);
            // 获取当前文本节点的最后位置
            const end = $from.end();
            // 得到当前选区结束位置到最后的部分生成 slice
            const slice = state.doc.slice($to.pos, end);
            // 构建一个 paragraph, 将 slice 的 content 当做其内容, 此处可以直接写 create, 也可以使用 findWrapper 工具函数
            const node = state.schema.nodes.p.create(null, state.schema.nodes.textBlock.create(null, slice.content));
            // 然后删除从 from 到 end 的内容
            tr.delete($from.pos, end);
            // 因为之前的 delete 操作, 需要 mapping pos
            const mappedPos = tr.mapping.map(insertPos);
            // 插入
            tr.insert(mappedPos, node);
            // 此时已经插入成功, 但是光标还在上面, 因此移动这个光标(新建一个 TextSelection 即可)
            tr.setSelection(TextSelection.create(tr.doc, mappedPos + 2));
            dispatch(tr.scrollIntoView());
            return true;
        } else {
            // 否则理论上应该会有其他模块处理选区, 当前选区应该是 nodeblock
            return false;
        }
        return false;
    },
    // Delete: (state: EditorState, dispatch: Function, view: EditorView) => {
    //     // delete 只处理最基本的 paragraph 内容的删除, 且假设其前后都是 paragraph
    //     // 其他的如在第一个位置按删除键后该如何处理, 则是其他 module 的任务
    //     const selection: Selection = state.selection;
    //     const $from = selection.$from;
    //     const $to = selection.$to;
    //     const tr = state.tr;
    //     if (selection instanceof TextSelection && isInTextBlock(state)) {
    //         // 如果是光标, 则删除前一个位置
    //         if ((<TextSelection>selection).$cursor) {
    //             if ($from.textOffset > 0) {
    //                 tr.delete($from.pos - 1, $from.pos);
    //                 tr.setSelection(TextSelection.create(tr.doc, tr.mapping.map($from.pos)))
    //                 dispatch(tr);
    //             }
    //         }
    //     }
    // }
}
