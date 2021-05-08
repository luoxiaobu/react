// 核心库 预渲染平台无关 将模板变成一个对象 vodm {props,type,ref}
import React, { useState } from 'react';

// 渲染库 可以把react 渲染到不同平台上 react-dom react-canvas react-native
import ReactDom from 'react-dom';


// 解决的问题：（是什么）
// 可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性
// 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。

function Item(props) {
    let [number, setNumber] = useState(0)
    console.log(props)
    return (<div style={{ borderTop: '5px solid #ccc', display: 'flex' }}>
        <div style={{ flex: 1 }}>{props.name}</div>
        <div style={{ flex: 1 }}>{props.price}</div>
        <span style={{ flex: 1 }}>{number}</span>
        <button onClick={() => setNumber(number + 1)}>+</button>
    </div>)
}

// 问题组件Button 并未修改 ，但函数组件Button依旧执行了

// let data = [{name:'可乐', price: '5', id:'pi-123'},{name:'雪碧', price: '10',id:'pi-124'}]
// function App(){
//     let [name,setName] = React.useState('xiaobu');
//     return (
//       <div>
//         <input type="text" value={name} onChange={event=>setName(event.target.value)}/>
//         <div>{name}</div>
//         <div style={{display:'flex'}}>
//             <div style={{flex: 1}}>商品</div>
//             <span style={{flex: 1}}>单价</span>
//             <span style={{flex: 1}}>数量</span>
//         </div>
//         {data.map(item=>{ return <Item key= {item.id} {...item}></Item>})}
//       </div>
//     )
//   }


// useCallback, useMemo  
/**
 * React.memo 一个函数组件 属性不变就跳过渲染复用
 * useCallback 减少函数创建的次数
 * useMemo 减少对象创建的次数
 */

// 一个函数组件 属性不变就跳过渲染复用
let MemoItem = React.memo(Item)

let data = [{ name: '可乐', price: '5', id: 'pi-123' }, { name: '雪碧', price: '10', id: 'pi-124' }]
function App() {
    let [name, setName] = React.useState('xiaobu');
    return (
        <div>
            <input type="text" value={name} onChange={event => setName(event.target.value)} />
            <div>{name}</div>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>商品</div>
                <span style={{ flex: 1 }}>单价</span>
                <span style={{ flex: 1 }}>数量</span>
            </div>
            {data.map(item => { return <MemoItem key={item.id} {...item}></MemoItem> })}
        </div>
    )
}
ReactDom.render(<App />, document.getElementById('root'))

// React.memo 仅检查 props 变更。如果函数组件被 React.memo 包裹，且其实现中拥有 useState，useReducer 或 useContext 的 Hook，
// 当 context 发生变化时，它仍会重新渲染。
