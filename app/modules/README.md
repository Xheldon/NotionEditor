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