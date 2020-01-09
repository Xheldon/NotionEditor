# Schema 设计

基础 schema 是两个 doc 和 text, 这是 Prosemirror 默认的两个最大和最小可编辑 schema. 而设计 schema 的时候我使用的最小编辑单元是 textblock, 表现形式是一个 div 中包含着 text, 比如:

```html
<div>一些文本</div>
```

所有的元素都是使用 div 进行模拟, 而不是使用语义化的 p/ul/ol 等进行, 这是为了摆脱浏览器的限制, 如段落嵌套段落的时候, p 标签无法嵌套块级元素等.

按照元素范围的大小可以有以下表示:

text < textblock < block < section

block 包含的元素有: paragraph, blockquote, list, heading, divider, codeblock

section 是一个可以包含 block 的 div, 主要用途是在水平分隔多列上, 以让每个 section 包含多个 block. section 包含的元素有: section

# 元素结构示例

## paragraph

### 基础形式
```html
<div type="paragraph">
    <div>一些文本</div>
</div>
```

### 高级形式
```html
<div type="paragraph">
    <div>一些文本</div>
    <div type="block-type"></div>
</div>
```

此外, 段落的缩进被用样式来实现.


## list(包括有序/无序/todo)

### 基础形式
```html
<div type="list">
    <div>1.</div>
    <div>
        <div>一些文本</div>
    </div>
</div>
```

### 高级形式
```html
<div type="list">
    <div>1.</div>
    <div>
        <div>一些文本</div>
        <div type="block-type"></div>
    </div>
</div>
```
## 其他非原子元素(heading/blockquote/codeblock)

```html
<div type="block-type">
    <div>一些文本</div>
</div>
```

## 原子元素

### image(不支持行内 image, 行内的请使用 emoji)

```html
<img type="image" />
```

### divide(hr)

```html
<div type="block-type"></div>
```

## section 元素

```html
<div type="section">
    <div type="block-type"></div>
</>
```

# 交互设计

此处参照 notion 交互.

1. 不允许跨 block 选择内容. 如, 无法选择其中一个 block 的后半部分内容后, 再选中下一个 block 的前半部分内容. 如果先选中了当前 block 的后半部分内容后, 鼠标不松开滑动到下一个 block 意图选中其前半部分, 则效果是两个 block 都被整体选中.

# keymap

相同按键在不同元素中的行为不同, 因此每个 module 都定义了与其相关的 keymap, 以提供给 plugin 引用

## Enter

### 一般情况

1. 如果是光标, 会直接在当前 block 下新建一个同级的 paragraph 元素, 除非有特殊情况(见下).
2. 如果是选中了内容, 则会将内容删除, 然后再下面新建一个同级的 paragraph 元素, 除非有特殊情况(见下).
3. 如果选中了内容, 且内容后还有文本, 则会将选中内容删除, 然后将选区后的内容放到下一个 paragraph 中, 除非有特殊情况(见下).
4. 如果选中了整个 node 节点, 则什么也不做, 取消选区.

### 在 list 中

会在当前 section 下新建一个同类型的 list block, 光标/选区/选区后还有内容的情况与一般情况相同.

### 在 codeblock 中

会直接换行, 光标/选区/选区后还有内容的情况与一般情况相同.

