import { EditorView } from 'prosemirror-view';
import { EditorState, Plugin, PluginKey, Transaction } from 'prosemirror-state';

import { ViewReturn } from '@interfaces';

import { View } from '@components/commons/View';
import SlashPopupView from '@components/slash/slash-popup';
import { SHOW_SLASH_POPUP, CREATE_OR_UPDATE_SLASH_POPUP, createOrUpdateSlashPopup } from '@redux/actions';
import { rdxDispatch } from '@redux/store';

export const slashPopupPluginKey = new PluginKey('slash-popup');

export const slashPopupPlugin: () => Plugin = () => new Plugin({
    key: slashPopupPluginKey,
    state: {
        init(): any {
            return null;
        },
        apply(tr: Transaction, value: any, oldState: EditorState, newState: EditorState): any {
            // 如果 typebehind 监测到了, 则设置 meta, 显示出弹窗 如果没有监测到, 则取消
            // 取消逻辑在 change 插件中统一控制所有 popup
            if (newState.selection.empty) {
                let meta = tr.getMeta(slashPopupPluginKey);
                if (meta) {
                    rdxDispatch(createOrUpdateSlashPopup({
                        type: CREATE_OR_UPDATE_SLASH_POPUP,
                        options: {
                            show: true,
                            ...meta
                        }
                    }));
                }

                // 之前为了减少正则匹配的消耗, 做了个小 trick, 得不偿失, 后来注释掉了
                // Note: the inputrule trigger the slash input, so we set it into the state directly to make it could update the SlashPlugin view
                // let meta = tr.getMeta(slashPopupPluginKey);
                // if (meta) {
                //     return meta;
                // } else {
                //     let old = slashPopupPluginKey.getState(oldState);
                //     if (old) {
                //         if (oldState.selection.from !== newState.selection.from) {
                //             // after typed the 'slash', only should show the pop when the cursor is after the slash, so limit the old start must lower the cursor
                //             if (newState.selection.from - old.start > 9 || newState.selection.from - old.start <= 0) {
                //                 return null;
                //             } else {
                //                 // 此处 rdxDispatch 一个 action
                //                 return {
                //                     start: old.start,
                //                     end: newState.selection.from,
                //                     filterText: newState.doc.textBetween(old.start, newState.selection.from)
                //                 };
                //             }
                //         } else {
                //             return {...old};
                //         }
                //     }
                // }
            }
        }
    }
});