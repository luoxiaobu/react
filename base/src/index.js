// 核心库 预渲染平台无关 将模板变成 一个对象 vdom {props,type,ref}
import React from 'react';

//渲染库 可以把react渲染到不同平台上 react-dom react-native react-canvas
import ReactDom from 'react-dom';


class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { number: 0 };
    }
    // fiels class
    handleClick = (event) => {
        // 在当前批处理下 this.state.number 是不会改变的
        // event.stopPropagation()
        console.log(event)
        this.setState({number:this.state.number + 1})
        console.log(this.state.number)
        this.setState({number:this.state.number + 1})
        console.log(this.state.number)
    }

    render() {
        return(<div onClick={()=>{alert(1)}}>
            <h1 style={{color:'#ccc'}}>xiaobu test</h1>
            <div>{this.state.number}</div>
            <div><button onClick={this.handleClick}>点击一下</button></div>
        </div>)
    }
}

ReactDom.render(<Counter/>,document.getElementById('root'))