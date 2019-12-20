import { Plugin, PluginKey } from 'prosemirror-state';

export const pluginKey = new PluginKey('list');

export default (): Plugin =>
    new Plugin({
        key: pluginKey
    })