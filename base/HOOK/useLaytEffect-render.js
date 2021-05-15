import React from 'react'
import ReactDom from 'react-dom'

/**
 * 其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect。
 * 可以使用它来读取 DOM 布局并同步触发重渲染。
 * 在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。
 * 尽可能使用标准的 useEffect 以避免阻塞视觉更新。
 * useLayoutEffect hook从上一次更新的销毁函数调用到本次更新的回调函数调用是同步执行的。
 */

 function APP() {
    let [count, setCount] = React.useState(0);
    let [count2, setCount2] = React.useState(0);
    console.log('----------------------------------------')
    console.log('count',count,'count2:',count2)
    React.useLayoutEffect(() => {
        console.log('setInterval: 1')
        let timer = setInterval(() => {
            console.log('setInterval:count')
            if(count>=2) {
                clearInterval(timer)
                return 
            }
            setCount((count) => {
                return count + 1;
            })
        },1000);
        return () => {
            console.log('clearInterval 1')
            clearInterval(timer)
        }
    })
    React.useLayoutEffect(() => {
        console.log('setInterval: 2')
        let timer = setInterval(() => {
            console.log('setInterval:count2')
            if(count2>=200) {
                clearInterval(timer)
                return
            }
            setCount2((count2) => {
                return count2 + 100;
            })
        },1000);
        return () => {
            console.log('clearInterval: 2')
            clearInterval(timer)
        }
    })
    return <div style={{fontSize:'30px'}}>
        <div>count:{count }</div>
        {console.log('render')}
        <div>count2:{count2 }</div>
    </div>
}

ReactDom.render(<APP></APP>, document.getElementById('root'))

// ----------------------------------------
// index.js:16 count 0 count2: 0
// index.js:52 render
// index.js:18 setInterval: 1
// index.js:35 setInterval: 2
// index.js:20 setInterval:count
// index.js:15 ----------------------------------------
// index.js:16 count 1 count2: 0
// index.js:52 render
// index.js:30 clearInterval 1
// index.js:47 clearInterval: 2
// index.js:18 setInterval: 1
// index.js:35 setInterval: 2
// index.js:20 setInterval:count
// index.js:15 ----------------------------------------
// index.js:16 count 2 count2: 0
// index.js:52 render
// index.js:30 clearInterval 1
// index.js:47 clearInterval: 2
// index.js:18 setInterval: 1
// index.js:35 setInterval: 2
// index.js:20 setInterval:count
// index.js:37 setInterval:count2
// index.js:15 ----------------------------------------
// index.js:16 count 2 count2: 100
// index.js:52 render
// index.js:30 clearInterval 1
// index.js:47 clearInterval: 2
// index.js:18 setInterval: 1
// index.js:35 setInterval: 2
// index.js:20 setInterval:count
// index.js:37 setInterval:count2
// index.js:15 ----------------------------------------
// index.js:16 count 2 count2: 200
// index.js:52 render
// index.js:30 clearInterval 1
// index.js:47 clearInterval: 2
// index.js:18 setInterval: 1
// index.js:35 setInterval: 2
// index.js:20 setInterval:count
// index.js:37 setInterval:count2

// 比较与useEffect-render.js 比较结果图 ./img/ layoutEfect-and-effect.png 