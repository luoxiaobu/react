import Component from './component'
// import { REACT_FORWARD_TYPE } from './const'
/**
 * 
 * @param {string} type 元素 类型
 * @param {object} config  元素 属性 
 * @param  {...any} children  子元素
 * 
 * return  返回一个react 元素 object 对象
 */
function createElement(type, config, children) {
    let ref;
    if (config) {
        delete config.__source;
        // 用处？？？
        // ref = config.ref;
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
        type,
        ref
    }
}

function createRef() {
    return {
        current: null
    }
}

// // 获取传递给它的 ref，然后转发到它渲染的Dom上
function forwardRef(FunctionComponent) {
    // return class extends Component {
    //     render() {
    //         console.log(arguments)
    //         return FunctionComponent(...arguments)
    //     }
    // }
    // 从源码的输出看 此处应该返回一个带render 函数的对象
    //包装 FunctionComponent 是一个函数
    return {
        type: REACT_FORWARD_TYPE,
        render: FunctionComponent
    }
}

export default {
    createElement,
    Component,
    createRef,
    forwardRef
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