//当一个FunctionComponent含有useEffect或useLayoutEffect，他对应的Fiber节点也会被赋值effectTag。

import React from 'react'
import ReactDom from 'react-dom'

/**
 * useEffect 简单理解
 *
 */

// let effectList = [];
// let effectIndex = 0;

function APP() {
    let [count, setCount] = React.useState(0);
    let [count2, setCount2] = React.useState(0);
    console.log('----------------------------------------')
    console.log('count',count,'count2:',count2)
    React.useEffect(() => {
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
    React.useEffect(() => {
        console.log('setInterval: 2')
        let timer = setInterval(() => {
            console.log('setInterval: count2 ')
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
// index.js:18 count 0 count2: 0
// index.js:54 render
// index.js:20 setInterval: 1
// index.js:37 setInterval: 2
// index.js:22 setInterval:count
// index.js:17 ----------------------------------------
// index.js:18 count 1 count2: 0
// index.js:54 render
// index.js:39 setInterval: count2 
// index.js:32 clearInterval 1
// index.js:49 clearInterval: 2
// index.js:20 setInterval: 1
// index.js:37 setInterval: 2
// index.js:17 ----------------------------------------
// index.js:18 count 1 count2: 100
// index.js:54 render
// index.js:32 clearInterval 1
// index.js:49 clearInterval: 2
// index.js:20 setInterval: 1
// index.js:37 setInterval: 2
// index.js:22 setInterval:count
// index.js:17 ----------------------------------------
// index.js:18 count 2 count2: 100
// index.js:54 render
// index.js:39 setInterval: count2 
// index.js:32 clearInterval 1
// index.js:49 clearInterval: 2
// index.js:20 setInterval: 1
// index.js:37 setInterval: 2
// index.js:17 ----------------------------------------
// index.js:18 count 2 count2: 200
// index.js:54 render
// index.js:32 clearInterval 1
// index.js:49 clearInterval: 2
// index.js:20 setInterval: 1
// index.js:37 setInterval: 2
// index.js:22 setInterval:count
// index.js:39 setInterval: count2 

// 比较与useLaytEffect-render.js 比较结果图 ./img/ layoutEfect-and-effect.png 