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

    return (<div>
        <div>{number}</div>
        <button onClick={() => setNumber(number + 1)}>+</button>
    </div>)
}

ReactDom.render(<Button/>, document.getElementById('root'))

// 大概原理