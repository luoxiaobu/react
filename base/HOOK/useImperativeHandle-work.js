import React from 'react'
import ReactDom from 'react-dom'

/**
 * useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。
 * 在大多数情况下，应当避免使用 ref 这样的命令式代码。
 * useImperativeHandle 应当与 forwardRef 一起使用：
 *
 */

function useImperativeHandle(forwardRef,fn) {
    forwardRef.current = fn()
}

function TextInput(props, forwardRef) {
    const inputValue = React.useRef();
    // 每次TextInput 执行一次 React.useImperativeHandle函数就会给forwardRef.current 重新赋值一次
    // 多暴露给外界的信息起保护作用
    useImperativeHandle(forwardRef, () => {
        console.log('执行了： useImperativeHandle')
        return {
            // 理解对象里面是值和对象里面是函数的区别
            // 是函数是，代码执行到这是定义一个函数，并返回包含函数引用的对象
            // 当函数被调用时，就会返回inputValue.current.value 
            // 如果是值，则直线返回包含值得对象
            value() {
                return inputValue.current.value
            }
            // value: inputValue.current.value
        }
    });
    return (<div> { props.children} < input ref={inputValue} /></div>)
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
        var name = (firstName.current.value() + lastName.current.value()) || '';
        setResult(name)
    }, [])
    return (<div >
        <ForWardText ref={firstName}> 姓:</ForWardText>
        <ForWardText ref={lastName}>名:</ForWardText>
        <button onClick={add}>提交</button>
        <div>{result}</div>
    </div>)
}

ReactDom.render(<Form></Form>, document.getElementById('root'))

