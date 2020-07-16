import React, { ReactElement, Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';

import { slashPopupPluginKey } from '@modules/slash/plugin';
import { insertlist, insertparagraph } from '@commands';
import { StateType, EditorType } from '@interfaces';


import './style.scss';
import { withEditor } from '@components/context';

// make a list which has a title property to filter, a content to show and a handler to response;

// TODO: i18n
const actionList = [
    {
        title: 'unorderlist',
        content(): ReactElement {
            return (
                <div className={'n-insert-ul'}>插入列表</div>
            );
        },
        handler: insertlist,
        /*
        handler({ view, options }: { view: EditorView, options: {start: number, end: number} }) {
            // invoke the relate command
            // if the insertlist command is trigger by the slash way, we should delete the range from slash to the last typed, and then insert into the start position
            insertlist({
                view,
                options: {
                    type: 'unorder',
                    trigger: 'slash',
                    start: options.start,
                    end: options.end
                }
            });
        }
        */
    }, {
        title: 'paragraph',
        content(): ReactElement {
            return <div className={'n-insert-p'}>插入文本</div>
        },
        handler: insertparagraph
    }
];

function SlashPopupContainer({ show, options, editor }: {
    show: boolean;
    options: any;
    editor: EditorType;
}) {
    let { start, end, text } = options;
    let style = null;
    if (show) {
        let pos = editor.view.coordsAtPos(start);
        style = {
            left: pos.left + 'px',
            top: pos.bottom + 'px'
        };
        return <div className={}></div>
    }
}

const mapStateToProps = (state: StateType) => {
    return {
        ...state.popup
    }
};

// for test purpose
export const SlashPopupContainerComponent = SlashPopupContainer;

export default compose(
    withEditor,
    connect(mapStateToProps)
)(SlashPopupContainer);

function SlashPopupView(view: EditorView, prevState: EditorState, reduxState: StateType): ReactElement {
    let state = view.state; // new state;
    if (
        prevState && prevState.doc.eq(state.doc)
        && prevState.selection.eq(state.selection)
    ) {
        return;
    }
    let meta = slashPopupPluginKey.getState(state);
    let style = null;
    if (meta) {
        let pos = view.coordsAtPos(meta.start);
        style = {
            left: pos.left + 'px',
            top: pos.bottom + 'px'
        };
        let filterText = meta.filterText && meta.filterText.slice(1) || '';
        let childList: ReactElement[] = actionList.map((arg, k) => {
            if ((new RegExp(`${filterText}`, 'g')).test(arg.title)) {
                // const isActive = k === 0 || reduxState.popup.options.currentSelect === arg.title;
                return <div className={false ? 'active' : ''} key={arg.title} onClick={arg.handler.bind(null, {
                    view,
                    options: {
                        start: meta.start,
                        end: meta.end
                    }
                })}>{arg.content()}</div>
            }
        }).filter(Boolean);
        if (childList.length === 0) {
            childList = [<div key={'slash-empty'}>啥也没得哩!</div>];
        }
        return (
            <div
                className={'n-slash-popup'}
                style={style}
            >
                { childList }
            </div>
        );
    }
    return null;
}
