import Component from './component'
/**
 * 
 * @param {string} type 元素 类型
 * @param {object} config  元素 属性 
 * @param  {...any} children  子元素
 * 
 * return  返回一个react 元素 object 对象
 */
function createElement(type, config, children) {
    if (config) {
        delete config.__source;
    }
    let props = {...config }
        // 此处可能是数组
    if (arguments.length > 3) {
        children = Array.prototype.slice.call(arguments, 2)
    }
    // 此处可能是对象或者字符串
    props.children = children

    return {
        props,
        type
    }
}

export default {
    createElement,
    Component
}

/**
 * 
$$typeof: Symbol(react.element)
key: null
props: {className: "h1-style", style: {…}, children: Array(3)}
ref: null
type: "h1"
_owner: null
_store: {validated: false}
_self: null
_source: null
 */


// {props: {…}, type: "h1"}
// props:
// children: (3) ["hello", {…}, {…}]
// className: "h1-style"
// style: {color: "#ddd"}
// __proto__: Object
// type: "h1"
// __proto__: Object