import React from 'react'
import ReactDom from 'react-dom'

/**
 * useRef 简单理解
 *
 */

function TextInput (props,ref){
    console.log('TextInput')
    return (<div> { props.children} < input ref={ref} /></div>)
}
// forwardRef requires a render function 
// React.forwardRef 来获取传递给它的 ref，然后转发到 render function 上
const ForWardText = React.forwardRef(TextInput)

function Form() {
    console.log('Form')
    // useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。
    // 返回的 ref 对象在组件的整个生命周期内保持不变。
    let firstName = React.useRef();
    let lastName = React.useRef();
    let [result, setResult] = React.useState('')
    let add = React.useCallback(() => {
        var name  = (firstName.current.value + lastName.current.value) || '';
        setResult(name)
    },[])
    return (<div >
        <ForWardText ref={firstName}> 姓:</ForWardText>
        <ForWardText ref={lastName}>名:</ForWardText> 
        <button onClick={add}>提交</button>
        <div>{result}</div>
        </div>)
}

ReactDom.render(<Form></Form>, document.getElementById('root'))

// 伪代码实现
// let hook = [];
// let hookIndex = 0; //代表当前的hooks的索引
// function useRef(initialValue) {
//     if(!hook[hookIndex]) {
//         hook[hookIndex] = {current:initialValue}
//     }
//     return hook[hookIndex++]
// }
// 当hook[hookIndex] 第一次被赋值后，指向一个对象 {current:initialValue}
// 每次都修改对象.current 并没覆盖掉对象，返回的 ref 对象在组件的整个生命周期内保持不变
