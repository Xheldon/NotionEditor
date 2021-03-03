import { EditorView } from 'prosemirror-view';
import { EditorState, Plugin, PluginKey, Transaction } from 'prosemirror-state';

import { ViewReturn } from '@interfaces';

import { View } from '@components/commons/View';
import SlashPopupView from '@components/slash/slash-popup';
import { showPopup, SHOW_SLASH_POPUP } from '@redux/actions';
import { rdxDispatch } from '@redux/store';

export const slashPopupPluginKey = new PluginKey('slash-popup');

export const slashPopupPlugin: () => Plugin = () => new Plugin({
    key: slashPopupPluginKey,
    state: {
        init(): any {
            return null;
        },
        apply(tr: Transaction, value: any, oldState: EditorState, newState: EditorState): any {
            if (newState.selection.empty) {
                // Note: the inputrule trigger the slash input, so we set it into the state directly to make it could update the SlashPlugin view
                let meta = tr.getMeta(slashPopupPluginKey);
                console.log('meta:', meta);
                if (meta) {
                    return meta;
                } else {
                    let old = slashPopupPluginKey.getState(oldState);
                    if (old) {
                        if (oldState.selection.from !== newState.selection.from) {
                            // after typed the 'slash', only should show the pop when the cursor is after the slash, so limit the old start must lower the cursor
                            if (newState.selection.from - old.start > 9 || newState.selection.from - old.start <= 0) {
                                return null;
                            } else {
                                // 此处 rdxDispatch 一个 action
                                return {
                                    start: old.start,
                                    end: newState.selection.from,
                                    filterText: newState.doc.textBetween(old.start, newState.selection.from)
                                };
                            }
                        } else {
                            return {...old};
                        }
                    }
                }
            }
        }
    },
    props: {
        handleTextInput(view, from, to, text) {
            const {state: {tr}, dispatch}  = view;
            dispatch(tr.setMeta(slashPopupPluginKey, {from, to, text}));
            return false;
        }
    }
});