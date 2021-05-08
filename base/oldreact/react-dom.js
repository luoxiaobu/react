import { addEvent } from './event';
/**
 * 把虚拟dom 挂在到真实的DOM上面
 * @param {*} vdom
 * @param {*} parentDom
 */
function render(vdom, parentDom) {
    let domOrdomObject = createDom(vdom);
    if (domOrdomObject && domOrdomObject.classInstance) {
        let { dom, classInstance } = domOrdomObject;
        classInstance.componentDidMount && classInstance.componentDidMount();
        classInstance.parentNode = parentDom
        parentDom.appendChild(dom)
    } else {
        parentDom.appendChild(domOrdomObject)
    }

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
    if (typeof type === 'object' && type != null) {
        // 此处应该以type的值来区分
        if (type.render) {
            return updateForWardComponent(vdom)
        } else if (type._context) { // react 走的分支
            type._context._value = props.value
            dom = document.createDocumentFragment();
        } else if (type.type === 'REACT_CONTEXT_TYPE') {
            return updateConsumer(vdom)
        }
    } else if (typeof type === 'function') {
        return type.prototype.isReactComponent ? updateClassComponent(vdom) : updateFunctionComponent(vdom);
    } else {
        // 此处是对普通节点的处理
        dom = document.createElement(type);
        updateProps(dom, props);
    }

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

function updateConsumer(ConsumerVdom) {
    let { type, props } = ConsumerVdom;
    let vdom = props.children(type._value)
    return createDom(vdom)
}

/**
 * 
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

    classInstance.componentWillMount && classInstance.componentWillMount();

    // 组件第一次挂载时
    if (type.getDerivedStateFromProps) {
        let newState = type.getDerivedStateFromProps(classInstance.props, classInstance.state)
        if (newState) {
            classInstance.state = {...classInstance.state, ...newState };
        }
    }

    // 在执行render 方法前 给实例对象赋值
    if (type.contextType) {
        classInstance.context = type.contextType._value
    }

    // 执行render 方法
    let vdom = classInstance.render();
    let dom = createDom(vdom);
    // 组件实例上保存了真实dom的引用
    if (dom.nodeType === 11) {
        classInstance.dom = {...dom.children };
    } else {
        classInstance.dom = dom;
    }
    if (ref) {
        ref.current = classInstance
    }
    return { dom, classInstance };
}

// // ForWardComponent 实现主要是一个 ref 的传递
function updateForWardComponent(functionComponent) {
    let { type, props, ref } = functionComponent;
    let vdom = type.render(props, ref);
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
        if (Array.isArray(child)) {
            return reconcilChildren(child, dom)
        }
        render(child, dom)
    });
}

export default {
    render
}