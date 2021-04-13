// 关于 ref ， React.createRef(),React.forwardRef()


//类组件的ref 挂在的是组件的实例，可以调用实例上的方法
import React from 'react'
import ReactDOM from 'react-dom'

class TextInput extends React.Component {
    constructor(props) {
        super(props)
        this.input = React.createRef();
    }

    getFocus() {
        this.input.current.focus()
    }

    render() {
        return ( <div div > { this.props.children } < input ref = { this.input }/></div> )
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.firstInput = React.createRef();
    }

    add = () => {
        this.result.current.value = (this.a.current.value + this.b.current.value) || 0;
    }

    componentDidMount() {
        this.firstInput.current.getFocus()
    }

    render() {
        return ( <
            div >
            <TextInput ref = { this.firstInput } > 姓名: </TextInput> 
            <TextInput > 年龄: </TextInput> </div>
        )
    }
}

let form = < Form ></Form>
    //转换成一个object 对象
console.log(form)
ReactDOM.render(form, document.getElementById('root'))