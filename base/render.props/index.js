// 核心库 预渲染平台无关 将模板变成一个对象 vodm {props,type,ref}
import React from 'react';

// 渲染库 可以把react 渲染到不同平台上 react-dom react-canvas react-native
import ReactDom from 'react-dom';

// 具有 render prop 的组件接受一个返回 React 元素的函数
// 并在组件内部通过调用此函数来实现自己的渲染逻辑。
//  <DataProvider render={data => (
//       <h1>Hello {data.target}</h1>
//    )}/>
//    传递一个 React 元素的函数

// render prop 是一个用于告知组件需要渲染什么内容的函数 prop





class Cat extends React.Component {
    render() {
        return (<>
        <div style={{ height: '200px',width:'100%',border:'1px #ccc solid'}}></div>
        <p>x:{this.props.x} y:{this.props.y}</p>
        </>)
    }
}


// render prop 是一个用于告知组件需要渲染什么内容的函数 prop
class Mouse extends React.Component {
    constructor(props) {
        super(props);
        this.state = { x: 0, y: 0 };
    }

    handleMouseMove = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }

    render() {
        return(
        <div onMouseMove={this.handleMouseMove}>
            {this.props.render(this.state)}
        </div>)
    }
}

let MouseTracker = <Mouse render={mouse => (
    <Cat {...mouse} />
  )}/>

ReactDom.render(MouseTracker, document.getElementById('root'))