// 核心库 预渲染平台无关 将模板变成一个对象 vodm {props,type,ref}
import React from 'react';

// 渲染库 可以把react 渲染到不同平台上 react-dom react-canvas react-native
import ReactDom from 'react-dom';
// 高阶组件（HOC） 用于复用组件逻辑。

// 高阶组件是参数为组件，返回值为新组件的函数。

// 不要改变原始组件。使用组合。

// 常用方法
// 属性代理
// 反向继承

// class Page extends React.Component {
//     render() {
//         return (<div>hello,{this.props.name}</div>)
//     }
// }

// function withChange(OldComponent) {
//     return class extends React.Component {
//         //在这里面可以做一些抽离的公共逻辑 赋能原来的组件
        
//         //比如
//         componentDidMount() {
//             console.log(this.props.name)
//         }
//         render() {
//             return <OldComponent {...this.props}></OldComponent>
//         }
//     }
// }
// let HigPageComponent = withChange(Page)
// ReactDom.render(<HigPageComponent name= {'xiaobu'}/>,document.getElementById('root'))


// 核心库 预渲染平台无关 将模板变成一个对象 vodm {props,type,ref}
import React from 'react';

// 渲染库 可以把react 渲染到不同平台上 react-dom react-canvas react-native
import ReactDom from 'react-dom';

import './index.css'
// 高阶组件（HOC） 用于复用组件逻辑。
// 高阶组件是参数为组件，返回值为新组件的函数。
// 不要改变原始组件。使用组合。

// 常用方法
// 属性代理
// 反向继承


function withLoading(WrappedComponent) {
    return class Loading extends React.Component {


        // 渲染劫持
        render() {
            if (!this.props.data) {
                return <div>loading...</div>
            }
            return <WrappedComponent {...this.props} />
        }
    }
}
class Page extends React.Component {
    render() {
        return <div>{this.props.data}</div>
    }
}

let HigPageComponent = withLoading(Page)
ReactDom.render(<HigPageComponent data={'xiaobu'} />, document.getElementById('root'))

