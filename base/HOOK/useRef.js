import React from 'react';
import ReactDom from 'react-dom';
/**
 * useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。
 * 返回的 ref 对象在组件的整个生命周期内保持不变。
 * 
 */

//存在竞争状态的解决
let userInfor = {
    10: {
        name: '小卜',
        id: '10',
        data: [{ name: '可乐', price: 5, id: 'pi-123', number: 2 }, { name: '雪碧', price: 10, id: 'pi-124', number: 3 }]
    },
    15: {
        name: '小王',
        id: '15',
        data: [{ name: '雀巢咖啡', price: 5, id: 'pi-123', number: 2 }, { name: '安特', price: 150, id: 'pi-124', number: 3 }]
    }
}
const API = {
    async featchProductCat(userID) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(userInfor[userID])
            }, 5000-userID*100)
        })
    }
}

function Item(props) {
    console.log('Item')
    return (<div style={{ borderTop: '5px solid #ccc', display: 'flex' }}>
        <div style={{ flex: 1 }}>{props.name}</div>
        <div style={{ flex: 1 }}>{props.price}</div>
        <span style={{ flex: 1 }}>{props.number}</span>
        <button onClick={() => { props.changNumber(props.id) }}>+</button>
    </div>)
}
let MemoItem = React.memo(Item)
function count(data) {
    var priceCount = 0
    data.forEach((item) => {
        priceCount = priceCount + item.price * item.number
    })
    return priceCount
}

// 伪代码实现
let hook = [];
let hookIndex = 0; //代表当前的hooks的索引
function useRef(initialValue) {
    if(!hook[hookIndex]) {
        hook[hookIndex] = {current:initialValue}
    }
    return hook[hookIndex++]
}

function App(props) {
    console.log('App')
    hookIndex = 0
    // useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。
    // 返回的 ref 对象在组件的整个生命周期内保持不变。
    let usrData = useRef([]);
    let userName = useRef('');
    let [price, setPrice] = React.useState(0)
   
    React.useEffect(() => {
        (async function fetchData() {
            let { data, name } = await API.featchProductCat(10);
                usrData.current = data
                userName.current = name
                setPrice(count(data))
        })();
    }, [props.userID])
    let memoizedchangNumber = React.useCallback((id) => {
        let product = usrData.current.find((item => item.id === id))
        product.number = product.number + 1
        setPrice(count(usrData.current))
    }, [])
    return (
        <div style={{ borderTop: '2px solid #ccc' }}>
            <div>{userName.current}</div>
            <div>总价：{price}</div>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>商品</div>
                <span style={{ flex: 1 }}>单价</span>
                <span style={{ flex: 1 }}>数量</span>
            </div>
            {usrData.current.length ? usrData.current.map(item => { return <MemoItem key={item.id} {...item} changNumber={memoizedchangNumber}></MemoItem> }) : null}
        </div>
    )
}
ReactDom.render(<App />, document.getElementById('root'))
