# Schema 设计

基础 schema 是两个 doc 和 text, 这是 Prosemirror 默认的两个最大和最小可编辑 schema. 而设计 schema 的时候我使用的最小编辑单元是 textblock, 表现形式是一个 div 中包含着 text, 比如:

```html
<div>一些文本</div>
```

按照元素范围的大小可以有以下表示:

text < textblock < block < section

block 包含的元素有: paragraph, blockquote, list, heading, divider, codeblock

section 是一个可以包含 block 的 div, 主要用途是在水平分隔多列上, 以让每个 section 包含多个 block. section 包含的元素有: section

## 元素结构示例

###

# All

## common

This `module` folder contains the all element appeared in the editor. There have several type could sum up below:

### Type one(fixed content): blockquote, heading

```html
<div type>
    <div text-block>
        text-content
    </div>
</div>
```

### Type two(variable content): paragraph

```html
<div paragraph>
    <div text-block>
        text-content        
    </div>
</div>
```

```html
<div paragraph>
    <div text-block>
        text-content        
    </div>
    <div intend-block>
        <div block></div>    
    </div>
</div>
```

### Type two(complex content): ul

```html
<div type>
    <div order>number</div>
    <div container>
        <div text-block></div>
    </div>
</div>
```

```html
<div type>
    <div order>number</div>
    <div container>
        <div text-block></div>
        <div block></div>
    </div>
</div>
```

### Type three(no-content): hr

```html
<div type>
    <div></div>
</div>
```