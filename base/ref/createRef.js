// 关于 ref ， React.createRef(),React.forwardRef()
// React.forwardRef() 内部实现主要是 ref的传递

//
import React from 'react'
import ReactDOM from 'react-dom'

//forwardRef requires a render function 
// TextInput 使用 React.forwardRef 来获取传递给它的 ref，然后转发到它渲染的 DOM input 上
let TextInput = React.forwardRef((props,ref)=>{
    debugger
    return (<div>{props.children}<input ref={ref}/></div>)
})

console.log(TextInput)
class Form extends React.Component{
    constructor(props){
        super(props);
        this.firstInput = React.createRef();
    }

    componentDidMount() {
       this.firstInput.current.focus()
    }

    render(){
        return(
            <div>
               <TextInput ref={this.firstInput}>姓名</TextInput>
               <TextInput>年龄</TextInput>
            </div>
        )
    }
}

let form = <Form></Form>
//转换成一个object 对象
console.log(form)
ReactDOM.render(form,document.getElementById('root'))