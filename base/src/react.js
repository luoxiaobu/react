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

    // 此处可对type 做一下统一规范
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
function forwardRef(render) {
    // return class extends Component {
    //     render() {
    //         console.log(arguments)
    //         return FunctionComponent(...arguments)
    //     }
    // }
    //在createDom 的时候调用 render 传入 props 和 ref
    return {
        type: 'REACT_FORWARD_REF_TYPE',
        render
    }
}

function createContext() {
    // 这是提供给函数组件用的
    // function Consumer(props) {
    //     return props.children(Provider._value)
    // }

    // function Provider(props) {
    //     Provider._value = props.value
    //     return props.children
    // }
    // return {
    //     Consumer,
    //     Provider
    // }
    // 类似于构建了一个闭包存储值
    const context = {
        type: 'REACT_CONTEXT_TYPE',
        Provider: null,
        Consumer: null,
        _value: null
    };

    //这一整个对象值都是type方便处理，常规下一个是一个string 后期代码做处理。此处只是模仿结构 
    // 用来保存值
    context.Provider = {
        type: 'REACT_PROVIDER_TYPE',
        _context: context
    };
    //
    context.Consumer = context;
    return context
}


export default {
    createElement,
    Component,
    createRef,
    forwardRef,
    createContext
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