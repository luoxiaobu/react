// 核心库 预渲染平台无关 将模板变成一个对象 vodm {props,type,ref}
import React, { useState } from 'react';

// 渲染库 可以把react 渲染到不同平台上 react-dom react-canvas react-native
import ReactDom from 'react-dom';


// 解决的问题：（是什么）
// 可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性
// 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。

// 怎么用：
function Button() {
    let [number, setNumber] = useState(0)
    let [haha, setHaha] = useState(0)
    return (<div>
        <div>{number}</div>
        <button onClick={() => setNumber(number + 1)}>+</button>
        <button onClick={() => setHaha(haha + 1)}>+1</button>
    </div>)
}

ReactDom.render(<Button />, document.getElementById('root'))

// 伪代码实现

// let hookStates = [];//放着此组件的所有的hooks数据, 源码中是一个链表 且是存储在对应的 FiberNode 中
// let hookIndex = 0; //代表当前的hooks的索引 
// function useState(initialState) {
//     let hookStates[hookIndex] = hookStates[hookIndex] || initialState;
//     function setState(state) {
//         let newState
//         if (typeof state === 'function') {
//             newState = state(hookStates[hookIndex]);
//         } else {
//             newState = state
//         }
//         if (Object.is(hookStates[hookIndex], newState)) {
//             return;
//         } else {
//             hookStates[hookIndex] = newState;
//             // 此处安排渲染，
//             schedule();
//         }
//     }
//     return [hookStates[hookIndex],setState];
// }

// 对于当前reactElement 对应一个 FiberNode

// ```js 
// {
// //保存该FunctionComponent对应的Hooks链表
// this.memoizedState = null;
// // 对于 FunctionComponent，指函数本身，对于ClassComponent，指class，// 对于HostComponent，指DOM节点tagName
// this.type = null;
// // Fiber对应的真实DOM节点
// this.stateNode = null;
// }

// ```