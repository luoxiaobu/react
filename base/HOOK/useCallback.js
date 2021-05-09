// 核心库 预渲染平台无关 将模板变成一个对象 vodm {props,type,ref}
import React from 'react';

// 渲染库 可以把react 渲染到不同平台上 react-dom react-canvas react-native
import ReactDom from 'react-dom';


// 解决的问题：（是什么）
// 可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性
// 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。

function Item(props) {
    console.log('Item')
    return (<div style={{ borderTop: '5px solid #ccc', display: 'flex' }}>
        <div style={{ flex: 1 }}>{props.name}</div>
        <div style={{ flex: 1 }}>{props.price}</div>
        <span style={{ flex: 1 }}>{props.number}</span>
        <button onClick={() => { props.changNumber(props.id) }}>+</button>
    </div>)
}

/**
 * React.memo 一个函数组件 属性不变就跳过渲染复用
 * useCallback 把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。
 * useMemo 减少对象创建的次数
 */

// 一个函数组件 属性不变就跳过渲染复用
let MemoItem = React.memo(Item)
//问题： 每次APP函数被调用时，内联回调函数的changNumber功能并没有改变，但函数changNumber会重新赋值，MemoItem组件依旧被执行了
// useCallback 解决问题
// useCallback 把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，
//该回调函数仅在某个依赖项改变时才会更新。
let data = [{ name: '可乐', price: 5, id: 'pi-123', number: 2 }, { name: '雪碧', price: 10, id: 'pi-124', number: 3 }]
function count(data) {
    var priceCount = 0
    data.forEach((item) => {
        priceCount = priceCount + item.price * item.number
    })
    return priceCount
}
function App() {
    console.log('App')
    let [name, setName] = React.useState('xiaobu');
    // count 函数只在初始化执行一次
    let [price, setPrice] = React.useState(() => count(data))
    let countPrice = () => {
        setPrice(count(data))
    }
    // let changNumber = (id) => {
    //     let product = data.find((item => item.id === id))
    //     product.number = product.number + 1
    //     countPrice()
    // }
    //空数组，不依赖任何项
    //内联回调函数 子组件会用到
    let memoizedchangNumber = React.useCallback((id) => {
        let product = data.find((item => item.id === id))
        product.number = product.number + 1
        countPrice()
    },[])
    // countPrice()
    return (
        <div>
            <input type="text" value={name} onChange={event => setName(event.target.value)} />
            <div>{name}</div>
            <div>总价：{price}</div>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>商品</div>
                <span style={{ flex: 1 }}>单价</span>
                <span style={{ flex: 1 }}>数量</span>
            </div>
            {data.map(item => { return <MemoItem key={item.id} {...item} changNumber={memoizedchangNumber}></MemoItem> })}
        </div>
    )
}
ReactDom.render(<App />, document.getElementById('root'))

// 伪代码
// 对于当前reactElement 对应一个 FiberNode 结构简略如下
// ```js 
// {
// //保存该FunctionComponent对应的Hooks链表
// this.memoizedState = null;
// // 对于 FunctionComponent，指函数本身，对于ClassComponent，指class，// 对于HostComponent，指DOM节点tagName
// this.type = null;
// // Fiber对应的真实DOM节点
// this.stateNode = null; 
// }
// 每一次 App执行时都可以从 FiberNode 里面取回存储的函数
// let hook= [];
// let hookIndex = 0; //代表当前的hooks的索引 
// function useCallback(callback,deps) {
//     if(hook[hookIndex]&&deps) {
//         let [lastCallback,lastCallbackDeps] = hook[hookIndex];
//         let same = lastCallbackDeps.every((item,index)=>item === deps[index])
//         if(same) {
//             hookIndex ++
//             return lastCallback
//         }
//     }
//     hook[hookIndex++] = [callback,deps]
//     return callback;
// }
