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

    let { type, props } = vdom;
    let dom;
    if (typeof type === 'function') {
        return type.prototype.isReactComponent ? updateClassComponent(type, props) : updateFunctionComponent(type, props);
    } else {
        dom = document.createElement(type);
    }

    updateProps(dom, props);
    // 处理子元素
    if (typeof props.children === 'string' || typeof props.children == 'number') {
        dom.textContent = props.children;
    } else if (typeof props.children === 'object' && !Array.isArray(props.children)) {
        render(props.children, dom);
    } else if (Array.isArray(props.children)) {
        reconcilChildren(props.children, dom)
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
function updateFunctionComponent(type, props) {
    let vdom = type(props)
    return createDom(vdom)
}

function updateClassComponent(type, props) {
    // 创建一个实例
    let classInstance = new type(props);
    // 执行render 方法
    let vdom = classInstance.render();
    let dom = createDom(vdom);
    // 组件实例上保存了真实dom的引用
    classInstance.dom = dom;
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