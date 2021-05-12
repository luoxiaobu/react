import React from 'react';
import ReactDom from 'react-dom';
/**
 * useEffect
 * 赋值给 useEffect 的函数会在组件渲染到屏幕之后执行。
 * 你可以把 effect 看作从 React 的纯函数式世界通往命令式世界的逃生通道。
 */


function App() {
    console.log('App')
    let [count, setCount] = React.useState(0);
    // 赋值给 useEffect 的函数会在组件渲染到屏幕之后执行。
    React.useEffect(() => {
        let num = 0
        let timer = setInterval(() => {
            num++
            if(num >=2) {
                console.log('clearInterval, num',num)
                clearInterval(timer);
            }
            console.log('setInterval, num', num)
        }, 3000)
        // 什么时候会走到这,清除老定时器,执行下一次useEffect 函数的时候前 或者组件被移除时
        return () => {
            console.log('clearInterval');
            clearInterval(timer);
        }
    })
    React.useEffect(() => {
        let num = 0
        let timer = setInterval(() => {
            num++
            if(num >=2) {
                console.log('clearInterval22, num',num)
                clearInterval(timer);
            }
            console.log('setInterval22, num',num)
        },3000)
        return () => {
            console.log('clearInterval22');
            clearInterval(timer);
        }
    })
    return (<div>
        <div>{console.log('render')}</div>
        <div><button onClick={() => {
            setCount(count + 1)
        }}>+1</button></div>
    </div>)
}
function Page() {
    let [showAPP, setShowAPP] = React.useState(true);
    return (<div>
        {showAPP ? <App></App> : null}
        <div><button onClick={() => {
            setShowAPP(false)
        }}>remove APP</button></div>
    </div>)

}
ReactDom.render(<Page />, document.getElementById('root'))
// App
// index.js:45 render
// index.js:22 setInterval, num 1
// index.js:37 setInterval22, num 1
// index.js:19 clearInterval, num 2
// index.js:22 setInterval, num 2
// index.js:34 clearInterval22, num 2
// index.js:37 setInterval22, num 2
// click +1  
// index.js:11 App
// index.js:45 render
// index.js:25 clearInterval
// index.js:40 clearInterval22
// index.js:22 setInterval, num 1
// index.js:37 setInterval22, num 1
// index.js:19 clearInterval, num 2
// index.js:22 setInterval, num 2
// index.js:34 clearInterval22, num 2
// index.js:37 setInterval22, num 2
// click Remove APP
// index.js:25 clearInterval
// index.js:40 clearInterval22

// 清除 effect的时机
// 1.执行useEffect的回调函数前（组件渲染到屏幕之后执行）
// useEffect的执行需要保证所有组件useEffect的销毁函数都执行完后才能执行任意一个组件的useEffect的回调函数。
// 2. 节点销毁 （组件渲染到屏幕之后执行）