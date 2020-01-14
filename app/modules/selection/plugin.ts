/**
 * 此文件为了处理选区的问题, Notion 不允许跨 block 选取部分文本的情况出现, 因此如果发现跨文本选择操作, 需要及时将选区扩大为 from 和 to 所在的 node block节点
 */

import { Plugin, PluginKey } from 'prosemirror-state';

export const pluginKey = new PluginKey('selection');

 export default (): Plugin => 
    new Plugin({
        key: pluginKey
    })
