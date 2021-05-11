import React from 'react'
import ReactDom from 'react-dom'
/**
 * useState只是预置了reducer的useReducer
 * 状态的逻辑特别复杂 的时候可以使用useReducer
 * useReducer 还能给那些会触发深更新的组件做性能优化，因为你可以向子组件传递 dispatch 而不是回调函数 。
 * React 会确保 dispatch 函数的标识是稳定的，并且不会在组件重新渲染时改变。
 */

// action 是与dispatch 关联的
function reducer(pricre, action) {
    let product = data.find((item => item.id === action.id))
    switch (action.type) {
        case 'increment':
            product.number = product.number + 1
            return pricre + product.price
        case 'decrement':
            product.number = product.number - 1
            return pricre - product.price
        default:
            throw new Error('reducer error')
    }
}
let data = [{ name: '可乐', price: 5, id: 'pi-123', number: 2 }, { name: '雪碧', price: 10, id: 'pi-124', number: 3 }]
function init(data) {
    console.log('init')
    var priceCount = 0
    data.forEach((item) => {
        priceCount = priceCount + item.price * item.number
    })
    return priceCount
}
function Item(props) {
    console.log(props)
    return (
        <div style={{ display: 'flex', borderTop: '2px solid #ccc' }}>
            <div style={{ flex: 1 }}>{props.name}</div>
            <div style={{ flex: 1 }}>{props.price}</div>
            <div style={{ display: 'flex', flex: 1 }}>
                <button disabled={props.number<=0} onClick={()=>{props.dispatch({type:'decrement',id:props.id})}}>-</button>
                <span style={{ flex: 1 }}>{props.number}</span>
                <button onClick={()=>{props.dispatch({type:'increment',id:props.id})}}>+</button></div>
        </div>
    )
}
let MemoItem = React.memo(Item)
function App() {
    console.log('App')
    let [name, setName] = React.useState('xiaobu');
    // React 会确保 dispatch 函数的标识是稳定的，并且不会在组件重新渲染时改变。
    let [price, dispatch] = React.useReducer(reducer, data, init)

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
            {data.map(item => { return <MemoItem key={item.id} {...item} dispatch = {dispatch}></MemoItem> })}
        </div>
    )
}

ReactDom.render(<App />, document.getElementById('root'))
// function App() {
//     console.log('App')
//     hookIndex = 0
//     let [name, setName] = useState('xiaobu');
//     // React 会确保 dispatch 函数的标识是稳定的，并且不会在组件重新渲染时改变。
//     let [price, dispatch] = useReducer(reducer, data, init)

//     return (
//         <div>
//             <input type="text" value={name} onChange={event => setName(event.target.value)} />
//             <div>{name}</div>
//             <div>总价：{price}</div>
//             <div style={{ display: 'flex' }}>
//                 <div style={{ flex: 1 }}>商品</div>
//                 <span style={{ flex: 1 }}>单价</span>
//                 <span style={{ flex: 1 }}>数量</span>
//             </div>
//             {data.map(item => { return <MemoItem key={item.id} {...item} dispatch={dispatch}></MemoItem> })}
//         </div>
//     )
// }

// let hook = [];
// let hookIndex = 0; //代表当前的hooks的索引
// function useState(initialState) {
//     return useReducer(null,initialState)
// }
// function useReducer(reducer, initialState, init) {
//     let currentIndex = hookIndex
//     hookIndex++
//     if (hook[currentIndex]) {
//         return hook[currentIndex];
//     } else {
//         let state = init ? init(initialState): (typeof initialState === 'function' ? initialState() : initialState);
//         function dispatch(action) {
//             let [olderState] = hook[currentIndex]
//             let newState
//             if (reducer) {
//                 newState = reducer(olderState, action)
//             } else {
//                 newState = action
//             }
//             if (!Object.is(olderState, newState)) {
//                 hook[currentIndex][0] = newState;
//                 // 此处安排渲染，
//                 schedule();
//             }
//         }
//         hook[currentIndex] = [state, dispatch]
//         return hook[currentIndex];
//     }
// }
// function schedule() {
//     ReactDom.render(<App />, document.getElementById('root'))
// }
// schedule()