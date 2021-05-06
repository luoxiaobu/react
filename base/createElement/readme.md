creatELement 主要是构建一个对象
```js
function createElement(type, config, children) {
    let ref;
    if (config) {
        delete config.__source;
        // 用处？？？思考
        // ref = config.ref;
    }
    let props = {...config }
        // 此处可能是数组
    if (arguments.length > 3) {
        children = Array.prototype.slice.call(arguments, 2)
    }
    // 此处可能是对象或者字符串
    props.children = children

    // 此处可对type 做一下统一规范
    return {
        props,
        type,
        ref
    }
}
```