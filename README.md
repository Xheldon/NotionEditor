# WARNING: IT'S NOT COMPLETED YET AND IN A VERY RAW STATUS, I WILL UPDATE WHEN I WANT, SO DON'T TRY TO USE IT, AND DON'T FORK IT(YOU CAN STAR OR WATCH IT IF YOU ARE INTEREST IN FOLLOW-UP DEVELOPMENT).

# 警告：本项目并未完成而且处于一个非常原始的状态，我会不定期在我想要更新的时候更新，因此不要尝试运行使用它，并且不要 fork 它（如果你对本项目的后续开发感兴趣，可以点 star 或者 watch）

# NotionEditor
A Notion's editor implement based on ProseMirror, just for feasibility studies.

# Detail 设计细节(WIP)

## Schema

基础 schema 是两个 doc 和 text, 这是 Prosemirror 默认的两个最大和最小可编辑 schema. 而设计 schema 的时候我使用的最小编辑单元是 textblock, 表现形式是一个 div 中包含着 text, 比如:

```html
<div>一些文本</div>
```

所有的元素都是使用 div 进行模拟, 而不是使用语义化的 p/ul/ol 等进行, 这是为了摆脱浏览器的限制, 如段落嵌套段落的时候, p 标签无法嵌套块级元素等.

按照元素范围的大小可以有以下表示:

text < textblock < block < section

block 类型的元素有: paragraph, blockquote, list, heading, divider, codeblock

section 是一个可以包含 block 的 div, 主要用途是在水平分隔多列上, 以让每个 section 包含多个 block. section 类型的元素有: section

## 元素结构示例

### paragraph

#### Base
```html
<div type="paragraph">
    <div>一些文本</div>
</div>
```

#### Advance

此时, paragraph 有两个容器, 一个是 textblock 类型, 还一个是 block 类型

```html
<div type="paragraph">
    <div>一些文本</div>
    <div type="block-type"></div>
</div>
```

此外, 段落的缩进有两种情况, 一个是当前段落是顶级元素, 则缩进时使用样式来实现; 如果当前段落之前也有段落或者 list, 则 tab 后会将带段落变成上一个段落/list 的 block 容器中的元素


### list(包括有序/无序/todo)

#### Base
```html
<div type="list">
    <div>1.</div>
    <div>
        <div>一些文本</div>
    </div>
</div>
```

#### Advance

此时, list 有两个容器, 一个是 textblock 类型, 还一个是 block 类型

```html
<div type="list">
    <div>1.</div>
    <div>
        <div>一些文本</div>
        <div type="block-type"></div>
    </div>
</div>
```
### 非原子元素

#### heading/blockquote/codeblock

```html
<div type="block-type">
    <div>一些文本</div>
</div>
```

#### table

table 也是用 div 模拟. TODO

#### media(video/audio)

预计使用 embeded 元素实现, 嵌入三方视频需要商业付费, TODO

### 原子元素

#### image(不支持行内 image, 行内的请使用 emoji)

```html
<img type="image" />
```

#### divide(hr)

```html
<div type="block-type"></div>
```

### section 元素

```html
<div type="section">
    <div type="block-type"></div>
</div>
```

## 交互设计

此处参照 Notion 交互.

1. 不允许跨 block 选择部分文本内容. 如, 无法选择其中一个 block 的后半部分内容后, 再选中下一个 block 的前半部分内容. 如果先选中了当前 block 的后半部分内容后, 鼠标不松开滑动到下一个 block 意图选中其前半部分, 则效果是两个 block 都被整体选中.

## keymap

keymap 文件定义了整个编辑器的功能键的交互行为, 此处统一处理, 不再将文件分散到各个 module 通过返回 true/false 来处理.

### Enter

#### 一般情况

1. 如果是光标, 会直接在当前 block 下新建一个同级的 paragraph 元素, 除非有特殊情况(见下).
2. 如果是选中了内容, 则会将内容删除, 然后再下面新建一个同级的 paragraph 元素, 除非有特殊情况(见下).
3. 如果选中了内容, 且内容后还有文本, 则会将选中内容删除, 然后将选区后的内容放到下一个 paragraph 中, 除非有特殊情况(见下).
4. 如果选中了非原子节点的整个 node 节点, 则什么也不做, 取消选区.
5. 如果选择了原子节点, 则在原子节点之后新建一个同级的 paragraph.

#### 复杂情况

##### 在 list 的 textblock 中

会在当前 section 下新建一个同类型的 list block, 光标/选区/选区后还有内容的情况与一般情况相同.

##### 在 codeblock 中

会直接换行, 光标/选区/选区后还有内容的情况与一般情况相同.

##### 当 slash 弹窗出现时

回车键按下后执行选中的插入命令. 插入位置是跟当前 textblock 父级节点同级

### Backspace

#### 一般情况

1. 如果是光标, 则删除光标前的一个字符
2. 如果是选区, 则删除选区内容
3. 如果光标在文本的最前方按下 backspace, 则属于复杂情况

#### 复杂情况

##### 在 list 附近

1. 如果光标所在的 textblock 父级 block 是 paragraph, 且与 paragraph 同级的上一个 block 是 list, 则寻找 list 的最后一个 textblock 的 end 位置(该位置可能在 list 的 block 容器中, 也可能直接就是 list 的 textblock), 将光标所在的文本块的文本内容附加到 end 之后, 然后删除文本块及其父级 block.
   1. 注意, 如果上一个 list 还有其子 block 类型的容器, 则重复相同步步骤, 直到找到 block 类型容器中的 textblock
   2. 注意, 如果 paragraph 含有其自己的 block 容器, 则在 textblock 内容附加到上一行后, 将其 block 容器内容每个"提升一级"
2. 如果光标所在的 paragraph 本身处于 list 的 block 容器中, 则首先将本 paragraph 提高到和其父级 list 同级, 如果仍然在 list 的 block 容器中则继续, 直到其为 doc 的直接子元素, 然后执行步骤 1.
3. 如果光标所在的 textblock 的父级是 list, 则将该 list 变为 paragraph, 保留 textblock 内容, 同时如果该 list 有 block 容器, 则将该容器作为 paragraph 的 block 容器

##### 在 paragraph 附近

1. 如果光标所在的 textblock 的父级是 paragraph, 且其前一个同级 block 也是 paragraph, 则将光标所在的 textblock 的文本放到 上一个 paragraph 中的最后一个 textblock 之后.
   1. 注意: 如果光标所在的 textblock 的父级 paragraph 还有 block 容器, 则将容器内容每个"提升一级"
2. 如果光标所在的 textblock 的父级 paragraph 本身也在另一个 paragraph 的 block 容器中, 则其将会先变成同级关系.

##### 在其他含有 textblock 的附近

1. 首先将该 block 变成 paragraph, 然后按照上述两种情况处理

##### 注意

1. Notion 有个特别交互, 有如下结构:

```html
<ol>
    <li>
        <div>1. </div>
        <div>
            <div textblock>
                abc
            </div>
            <div block>
                <div p1>
                    <div textblock>def</div>
                </div>
                <div p2>
                    <div textblock>ghi</div>
                </div>
                <div p3>
                    <div textblock>klm</div>
                </div>
            </div>
        </div>
    </li>
</ol>        
```

则在 d 之前按 backspace 时, def 会拼接到 abc 之后, 然后剩余的两个 ghi 和 klm 不变

在 g 之前按 backspace 时, 同样, ghi 会拼接到 def 之后, 然后剩余的 kml 不变

但是在 k 之前按 backspace 时, klm 会往前反缩进, 变成与 li 同级的 p 标签.

即: 在内嵌的 block 容器中(li 中或者 p 中都允许存在)的`最后一个` p 标签开始位置按下删除键, 则会取消缩进(反缩进), 变成与父级同级的元素. 但是在非最后位置的 p 标签中的开始位置按下删除键, 则只是将其附加到上一个 textblock 最后. 如果 `最后一个也是第一个元素`, 则`最后一个`逻辑优先, 即其会取消缩进.

其实这是一个 feature: 用户在一个 list 中, 按下回车后会继承当前行的缩进和类型, 如上例中, 在 abc 后按回车, 则新建一个 list. 而在 klm 后按回车, 则继续在 block 容器中新建一个 p 标签. 如果用户此时或者在最后一行输入文字后在行首按下 backspace 多半是想要取消缩进跳出 list 的 block 容器, 而不是想要回到上一行 paragraph 中.

### 上下左右键

#### 一般情况

1. 当 slash 弹窗出来的时候控制选中的命令, 否则走系统默认


## React 组件

使用了 React 构建界面的有: Slash

之前实现弹窗等界面的方案:

1. 使用 typebehind 触发 slash plugin 的 setMeta, 信息为 slash 符号的起始和结束位置
2. 在 slash plugin 的 apply 中 getMeta, 拿到然后设置 plugin state, 同时进行新旧 start 和 end 的对比, 同时获取 slash 符号起始位置直到新的 state selection 的 end 位置的字符 filtertext
3. 拿到 start 和 end 和 filtertext 字符之后, slash plugin 的 view 就会据此渲染 react 组件, 同时通过 coordsAtPos 知道输入 slash 和 filtertext 的位置, 显示出来
4. react 组件有自己的 list, 每输入一个字符, slash plugin 的 view 的 update 方法就调用一次, react list 就会通过通过正则 filtertext 过滤部分的 list, 然后显示.

上述基本数据流是: 

`prosemirror` typebehind ---> `prosemirror` plugin set meta ---> `prosemirror` plugin state update ---> `prosemirror` view update ---> `react` component update(with new plugin state)

此方案有以下问题:

1. 我想在 keymap 中当 slash 弹窗出现时使用 ArrowUp/ArrowDown 来选择某个 list 由于每次 react list 都会随着 变得较为困难

改进后实现弹窗界面的方案:

1. 在 typebehind 中 setMeta slash plugin
2. 在 slash plugin 的 apply 返回 state 来组建 ProseMirror 的 state 的时候, 使用 redux 的 dispatch 来触发 react 的界面构建, 而不是使用 view 的界面
