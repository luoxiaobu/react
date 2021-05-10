import React from 'react'
import ReactDom from 'react-dom'


// react.memo 和 pureComponent

// React.memo 是对比组件的 props 但只是做浅层次比较

// React.PureComponent 是对state 和 props 做对比


// React.PureComponent
class PureComponent extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !(Object.is(this.props, nextProps) && Object.is(this.state, nextState))
    }
}

// React.memo 是对比组件的 props 但只是做浅层次比较, 如要做深层次比较 可传入第二参数

function MyComponent(props) {
    /* 使用 props 渲染 */
}

React.memo(MyComponent, areEqual)

function areEqual(prevProps, nextProps) {
    /*
    如果把 nextProps 传入 render 方法的返回结果与
    将 prevProps 传入 render 方法的返回结果一致则返回 true，
    否则返回 false
    */
}