// 核心库 预渲染平台无关 将模板变成一个对象 vodm {props,type,ref}
import React from 'react';

// 渲染库 可以把react 渲染到不同平台上 react-dom react-canvas react-native
import ReactDom from 'react-dom';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            name: 'xiaobu'
        }
        console.log('Counter 1.初始化状态状态对象 constructor');
    }
    static getDerivedStateFromProps(nextProps,prevState) {
        console.log('nextProps:',nextProps,'prevState:',prevState)
        console.log('Counter: getDerivedStateFromProps');
        return null
    }

    handleClick = () => {
        this.setState({count: this.state.count + 1 , hh: 2})
    }

    // componentWillMount() {
    //     console.log('Counter 2.组件将要挂在 componentWillMount');
    // }
    // 不常用生命周期
    // 此方法仅作为性能优化的方式而存在 return true or false
    shouldComponentUpdate(nextProps,nextState) {
        console.log('Counter 5. 询问用户组件是否要更新, shouldComponentUpdate');
        return true
    }
    // componentWillUpdate() {
    //     console.log('Counter 6. 组件将会更新，componentWillUpdate');
    // }
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
        return (
            <div>
                <p>{this.state.count}</p>
                <button onClick={this.handleClick}>+</button>
                <ChildCounter {...this.state}/>
            </div>
        )
    }
}

class ChildCounter extends React.Component {
    // getDerivedStateFromProps是一个高级复杂的功能，应该保守使用
    // getDerivedStateFromProps 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。
    // 它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。
    //此方法适用于罕见的用例，即 state 的值在任何时候都取决于 props。
    //例如，实现 <Transition> 组件可能很方便，该组件会比较当前组件与下一组件，以决定针对哪些组件进行转场动画。
    // static getDerivedStateFromProps(nextProps,prevState) {
    //     let {count} = nextProps;
    //     console.log('child: getDerivedStateFromProps');
    //     if(count%2 === 1) {
    //         return {number: count}
    //     } else {
    //         return {number: count *2}
    //     }
    // }
    constructor(props){
        super(props)
        this.state = { count: '123'}
        console.log('child: 1.constructor');
    }

    // componentWillMount(){
    //     console.log('child: 2.willmount')
    // }
    componentDidMount(){
        console.log('child: 4.didmount')
    }
    // 不常用生命周期 仅作为性能优化的方式存在
    shouldComponentUpdate(){
        console.log('child: 5.shouldUpdate')
        return true
    }
    // componentWillUpdate() {
    //     console.log('child: 6.willUpdate')
    // }

    // 为了需求开发的api ?????????
    // 在重新渲染之前触发，获取老的Dom 的状态
    //如果组件实现了 getSnapshotBeforeUpdate() 生命周期（不常用），则它的返回值
    // 将作为 componentDidUpdate() 的第三个参数 “snapshot” 参数传递。否则此参数将为 undefined。
    getSnapshotBeforeUpdate() {
        console.log('child: getSnapshotBeforeUpdate')
        return 1
    }

    componentDidUpdate(){
        console.log('child: 7.didUpdate')
    }
    componentWillUnmount(){
        console.log('child: willUnmount')
    }
    // 废弃
    // 如果父组件导致组件重新渲染，即使 props 没有更改 也会调用次方法。
    // 已经挂载的组件不会再执行constructor 所以此处做的是对数据的一些处理, 最好保持数据源的统一性
    // componentWillReceiveProps(newProps){
    //     //
    //     console.log(newProps)
    //     console.log('child: WillReceiveProps');
    //     // this.setState({...newProps})
    // }

    handleClick = () => {
        this.setState({count: this.state.count + 1 , hh: 2})
    }
    render(){
        console.log('child: 3.render')
        return (
            <div>
                <div>这是子计算器{this.props.count}</div>
                <div>这是子计算器{this.state.count}</div>
                <button onClick={this.handleClick}>+</button>
            </div>
        )
    }

}



ReactDom.render(<Counter count={1}/>, document.getElementById('root'))