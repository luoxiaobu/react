import React from 'react';
import ReactDom from 'react-dom';
/**
 * useEffect
 * 赋值给 useEffect 的函数会在组件渲染之后执行。
 * 你可以把 effect 看作从 React 的纯函数式世界通往命令式世界的逃生通道。
 */
// 深入理解useEffect 的执行
// https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/
// effectList相较于Fiber树，就像圣诞树上挂的那一串彩灯。

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
function Detial(props) {
    // count 函数只在初始化执行一次
    let [price, setPrice] = React.useState(0)
    // useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。
    // 返回的 ref 对象在组件的整个生命周期内保持不变。
    let usrData = React.useRef([]);
    let userName = React.useRef('');
    // 赋值给 useEffect 的函数会在组件渲染之后执行
    React.useEffect(() => {
        console.log('useEffect');
        // 存在竞争状态
        let didCancel = false;//此请求是否已经取消
        (async function fetchData() {
            let { data, name } = await API.featchProductCat(props.userID);
            if (!didCancel) {
                usrData.current = data
                userName.current = name
                setPrice(count(data))
            }
        })();
        return () => {
            // 这部分注销后 出现 race
            console.log('取消，useEffect');
            didCancel = true;//此请求是否已经取消
        }
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
let user = [{ name: '小卜', id: '10' }, { name: '小王', id: '15' }]
function App() {
    let [userID, setuserID] = React.useState(null)
    // 我要获取{id: 10}，然后立马切换到{id: 15}，
    // 但{id: 15}请求先出现，早先启动{id: 10}后来又完成的请求将错误地覆盖当前的状态。
    return (<div>
        {user.map((item) => {
            return (
                <div key={item.id}>
                    <span>{item.name}: {item.id}</span>
                    <button onClick={() => { setuserID(item.id) }}>show {item.name}</button>
                </div>
            )
        })}
        <div>
            <div style={{ borderTop: '2px solid #ccc' }}>
                <div>用户：{userID}</div>
            </div>
            {userID ? <Detial userID={userID}></Detial> : null}
        </div>
    </div>
    )
}
ReactDom.render(<App />, document.getElementById('root'))
