import React from 'react';
import ReactDom from 'react-dom';
/**
 * useContext
 * 接收一个 react.createContext的返回值（context对象）
 * 返回context 的当前值
 */

let ThemeContext = React.createContext();
const LIGHT = 'light'
const DARK = 'dark'
const THEMES = {
    [LIGHT]: {
        color: 'blue',
    },
    [DARK]: {
        color: 'green',
    },
};
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
    var priceCount = 0
    data.forEach((item) => {
        priceCount = priceCount + item.price * item.number
    })
    return priceCount
}
function Item(props) {
    console.log('item')
    // React.useContext(ThemeContext) 就取出value值来使用
    let theme = React.useContext(ThemeContext)
    return (
        <div style={{ display: 'flex', borderTop: '2px solid #ccc' , color:theme.color }}>
            <div style={{ flex: 1 }}>{props.name}</div>
            <div style={{ flex: 1 }}>{props.price}</div>
            <div style={{ display: 'flex', flex: 1 }}>
                <button style={{ color:theme.color }} disabled={props.number <= 0} onClick={() => { props.dispatch({ type: 'decrement', id: props.id }) }}>-</button>
                <span style={{flex: 1 }}>{props.number}</span>
                <button style={{ color:theme.color }} onClick={() => { props.dispatch({ type: 'increment', id: props.id }) }}>+</button></div>
        </div>
    )
}

// React.memo 仅检查 props 变更。如果函数组件被 React.memo 包裹，且其实现中拥有 useState，useReducer 或 useContext 的 Hook，
// 当 context 发生变化时，它仍会重新渲染。
let MemoItem = React.memo(Item)
function App() {
    console.log('APP')
    let [name, setName] = React.useState('xiaobu');
    // React 会确保 dispatch 函数的标识是稳定的，并且不会在组件重新渲染时改变。
    let [price, dispatch] = React.useReducer(reducer, data, init)
    let [theme, setTheme] = React.useState(LIGHT);
    let changeTheme = ()=>{
        if(theme === LIGHT) {
            setTheme(DARK)
        } else{
            setTheme(LIGHT)
        }
    }
    return (
        <div>
            <input type="text" value={name} onChange={event => setName(event.target.value)} />
            <div style={{ display: 'flex' ,margin: '10px 0'}}><button onClick={changeTheme}>改变主题</button></div>
            <div>{name}</div>
            <div>总价：{price}</div>
            <div>
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: 1 }}>商品</div>
                    <span style={{ flex: 1 }}>单价</span>
                    <span style={{ flex: 1 }}>数量</span>
                </div>
                {// 在此处会将value 的值赋给 ThemeContext， React.useContext(ThemeContext) 就取出value值来使用
                }
                <ThemeContext.Provider value={THEMES[theme]}>
                    {data.map(item => { return <MemoItem key={item.id} {...item} dispatch={dispatch}></MemoItem> })}
                </ThemeContext.Provider>
            </div>
        </div>
    )
}

ReactDom.render(<App />, document.getElementById('root'))

/**
 * function createContext() {
    function Provider(props) {
        context._value = props.value
        return props.children
    }
    const context = {
        Provider,
        Consumer: null,
        _value: null
    };
    context.Consumer = context;
    return context
}
function useContext(context){
    return context._value
}

在节点比较的时候会记录节点的
 */

//补充资料： https://github.com/facebook/react/issues/15156#issuecomment-474590693
