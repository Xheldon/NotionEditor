import React from 'react';
import { EditorState, Plugin, PluginKey, Transaction } from 'prosemirror-state';

import { ViewReturn } from '@interfaces';

import { View } from '@components/commons/View';
import SlashPopupView from '@components/slash/slash-popup';
import { showPopup, SHOW_SLASH_POPUP } from '@redux/actions';
import { rdxDispatch } from '@redux/store';
import { ReactElement } from 'react';

export const slashPopupPluginKey = new PluginKey('slash-popup');

export const slashPopupPlugin: () => Plugin = () => new Plugin({
    key: slashPopupPluginKey,
    state: {
        init(): any {
            return {
                show: false
            };
        },
        apply(tr: Transaction, value: any, oldState: EditorState, newState: EditorState): any {
            if (newState.selection.empty) {
                let meta = tr.getMeta(slashPopupPluginKey);
                console.log('meta:', meta, value);
                if (!meta) {
                    return value;
                } else {
                    // Note: last value show && the next meta.show not fasle mean that we are selecting the node to insert now
                    let state = value;
                    if (meta.show !== false) {
                        state = Object.assign({}, value, meta);
                        console.log('state:', state);
                        rdxDispatch(showPopup({
                            type: SHOW_SLASH_POPUP,
                            component: React.createElement(SlashPopupView, {}, null),
                            options: {
                                type: SHOW_SLASH_POPUP,
                                from: state.from,
                                to: state.to,
                                text: state.text,
                                prevState: oldState,
                                newState: newState
                            }
                        }));
                    }
                    return state;
                }
                // if (meta === '/') {
                //     // NOte: dispatch rdx & set the state
                //     return { show: true };
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
    },
    props: {
        handleTextInput(view, from, to, text) {
            const {state: {tr}, dispatch}  = view;
            const slashState = slashPopupPluginKey.getState(view.state);
            // Note: 按 esc 的时候或者插入完成的时候 show 会变成 false
            if (text === '/') {
                tr.insertText('/', from, to);
                tr.setMeta(slashPopupPluginKey, {from, to: to + 1, show: true, text});
                dispatch(tr);
                return true;
            } else if (slashState && slashState.show) {
                tr.insertText(text, from, to);
                tr.setMeta(slashPopupPluginKey, {to: to + 1});
                dispatch(tr);
                return true;
            }
            return false;
        }
    }
});