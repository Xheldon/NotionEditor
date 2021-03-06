import { AttributeSpec } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';

// node common attrs
export interface Attrs {
    [name: string]: AttributeSpec
}

// view return type
export interface ViewReturn {
    update?: (view: EditorView, prevState: EditorState) => void,
    destory?: () => void
}

/*
* redux related
* */
export {
    ActionType,
    StateType,
    PopupStateType,
    ReactViewType,
    PopupType
} from '@redux/interface';

/*
* command interface
* */

export interface CommandArgType {
    name?: string;
    value?: any;
    view?: EditorView;
    options?: {
        [name: string]: any
    };
}

export interface SelectType {
    type: string;
    options?: any
}
