// 核心库 预渲染平台无关 将模板变成一个对象 vodm {props,type,ref}
import React from 'react';

// 渲染库 可以把react 渲染到不同平台上 react-dom react-canvas react-native
import ReactDom from 'react-dom';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            name: 'xiaobu'
        }
        console.log('Counter 1.初始化状态状态对象 constructor');
    }

    handleClick = () => {
        this.setState({number: this.state.number + 1 })
    }

    componentWillMount() {
        console.log('Counter 2.组件将要挂在 componentWillMount');
    }
    // 不常用生命周期
    // 此方法仅作为性能优化的方式而存在
    shouldComponentUpdate() {
        console.log('Counter 5. 询问用户组件是否要更新, shouldComponentUpdate');
        return true
    }
    componentWillUpdate() {
        console.log('Counter 6. 组件将会更新，componentWillUpdate');
    }
    componentDidUpdate() {
        console.log('Counter 7. 组件将会更新完成，componentDidUpdate');
    }
    componentDidMount() {
        console.log('Counter 4.组件挂在成功 componentDidMount')
    }
    componentWillUnmount() {
        // console.log('Counter')
    }
    render() {
        console.log('Counter 3.render 通过调用render方法获得虚拟DOM对象');
        console.log(<ChildCounter {...this.state}/>)
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={this.handleClick}>+</button>
                <ChildCounter {...this.state}/>
            </div>
        )
    }
}

class ChildCounter extends React.Component {
    constructor(props){
        super(props)
        console.log(props)
        this.state = { number: 0}
        console.log('child: 1.constructor');
    }
    componentWillMount(){
        console.log('child: 2.willmount')
    }
    componentDidMount(){
        console.log('child: 4.didmount')
    }
    // 不常用生命周期 仅作为性能优化的方式存在
    shouldComponentUpdate(){
        console.log('child: 5.shouldUpdate')
        return true
    }
    componentWillUpdate() {
        console.log('child: 6.willUpdate')
    }
    componentDidUpdate(){
        console.log('child: 7.didUpdate')
    }
    componentWillUnmount(){
        console.log('child: willUnmount')
    }
    render(){
        console.log('child: 3.render')
        return (
            <div>这是子计算器{this.state.number}</div>
        )
    }

}



ReactDom.render(<Counter/>, document.getElementById('root'))