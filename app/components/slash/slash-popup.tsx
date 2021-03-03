import React, { ReactElement } from 'react';
import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';
import { Node } from 'prosemirror-model';

import { slashPopupPluginKey } from '@modules/slash/plugin';
import { insertlist, insertparagraph } from '@commands';
import { StateType } from '@redux/interface';

import './style.scss';
import { compose } from 'redux';
import {connect} from 'react-redux';
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

function SlashPopupComponent(props: any) {
    console.log('props:', props);
    const {editor, editor: {view}, from, to, text, prevState, newState} = props;
    
    let state = newState; // new state;
    if (
        prevState && prevState.doc.eq(state.doc)
        && prevState.selection.eq(state.selection)
    ) {
        return null;
    }
    let style = null;
    if (from && to) {
        let pos = view.coordsAtPos(from);
        style = {
            left: pos.left + 'px',
            top: pos.bottom + 'px'
        };
        //Note: use new state to get the filterText
        let filterText = state.doc.textBetween(from, to).slice(1);
        console.log('filterText:', filterText);
        let childList: ReactElement[] = actionList.map((arg, k) => {
            if ((new RegExp(`${filterText}`, 'g')).test(arg.title)) {
                // const isActive = k === 0 || reduxState.popup.options.currentSelect === arg.title;
                return <div className={false ? 'active' : ''} key={arg.title} onClick={arg.handler.bind(null, {
                    view,
                    options: {
                        start: from,
                        end: to
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

// TODO: state type
const mapStateToProps = (state: any) => {
    return {
        from: state.popup.options.from,
        to: state.popup.options.to,
        text: state.popup.options.text,
        prevState: state.popup.options.prevState,
        newState: state.popup.options.newState,
    }
};

export default compose(
    withEditor,
    connect(mapStateToProps),
)(SlashPopupComponent);