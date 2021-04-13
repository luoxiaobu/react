import { addEvent } from './event';
/**
 * 把虚拟dom 挂在到真实的DOM上面
 * @param {*} vdom
 * @param {*} parentDom
 */
function render(vdom, parentDom) {
    let dom = createDom(vdom);
    parentDom.appendChild(dom)
}
/**
 *
 *
 * @param {*} vdom
 * @returns 返回一个真实的 dom
 */
export function createDom(vdom) {
    if (typeof vdom === 'string' || typeof vdom == 'number') {
        return document.createTextNode(vdom)
    }

    let { type, props, ref } = vdom;
    let dom;
    if (typeof type === 'function') {
        return type.prototype.isReactComponent ? updateClassComponent(vdom) : updateFunctionComponent(vdom);
    } else {
        dom = document.createElement(type);
    }
    // 此处是对普通节点的处理
    updateProps(dom, props);
    // 处理子元素
    if (typeof props.children === 'string' || typeof props.children == 'number') {
        dom.textContent = props.children;
    } else if (typeof props.children === 'object' && !Array.isArray(props.children)) {
        render(props.children, dom);
    } else if (Array.isArray(props.children)) {
        reconcilChildren(props.children, dom)
    } else { // 兜底？？？？？
        dom.textContent = props.children ? props.children.toString() : '';
    }
    // 普通节点的ref
    if (ref) {
        ref.current = dom
    }
    return dom
}
/**
 *将函数组件转换成dom
 *
 * @param {*} type
 * @param {*} props
 * @returns
 */
function updateFunctionComponent(functionComponent) {
    let { type, props } = functionComponent;
    let vdom = type(props)
    return createDom(vdom)
}

function updateClassComponent(classComponent) {
    let { type, props, ref } = classComponent;
    // 创建一个实例
    let classInstance = new type(props);
    // 执行render 方法 
    let vdom = classInstance.render();
    let dom = createDom(vdom);
    // 组件实例上保存了真实dom的引用
    classInstance.dom = dom;
    if (ref) {
        ref.current = classInstance
    }
    return dom;
}

// ForWardComponent 实现主要是一个 ref 的传递
function updateForWardComponent(functionComponent) {
    let { type, props, ref } = functionComponent;
    let vdom = type.render(props, type);
    let dom = createDom(vdom);
    return dom;
}

/**
 *
 *
 * @param {*} dom
 * @param {*} props
 */
function updateProps(dom, props) {
    for (let key in props) {
        if (key === 'children') {
            continue;
        }
        if (key === 'style') {
            let style = props[key]
            for (key in style) {
                dom.style[key] = style[key]
            }
        } else if (key.startsWith('on')) { // 处理事件 合成函数？？
            addEvent(dom, key.toLowerCase(), props[key])
        } else {
            dom[key] = props[key]
        }
        // dom[key] = props[key]
    }
}


function reconcilChildren(children, dom) {
    children.forEach(child => {
        render(child, dom)
    });
}

export default {
    render
}