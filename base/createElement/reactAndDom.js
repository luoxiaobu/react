import React from './react';

import ReactDom from './react-dom';

// 分清楚 babel 编译时，和代码运行时。

// let element = React.createElement('h1', { className: 'h1-style', style: { color: '#ddd' } },'hello',
//  React.createElement('span', {style: { color: '#ccc' } },'xiaobu'), React.createElement('span', {style: { color: 'red' } },'!'))


// babel会将此段转义
// let element = <h1  className='h1-style' style={{ color: '#ddd' }}>hello <span>xiaobu</span><span style={{ color: 'red' }}>!</span></h1>
// 转义结果 let element = React.createElement('span', {style: { color: '#ccc' } },'xiaobu'), React.createElement('span', {style: { color: 'red' } },'!'))
// console.log(element)

// 函数内部也会被babel 转换
// function FunConponent(props) {
//     return(<div className='h1-style' style={{ color: '#ddd' }} >
//         hello<span style={{ color: '#ccc' }}>{props.children}</span>
//         <span style={{ color: 'red' }}>!</span>
//     </div>)
// }
// 此处就是一个React.createElement( FunConponent, {name:"hello"},'xiaobu')
// let element = <FunConponent name="hello">xiaobu</FunConponent>
// console.log(element.type.toString())

// render内部也会被babel 转换
class ClassComponent extends React.Component {

    render () {
        return (<div className='h1-style' style={{ color: '#ddd' }} >
            hello<span style={{ color: '#ccc' }}>{this.props.children}</span>
            <span style={{ color: 'red' }}>!</span>
        </div>
    )}
}
let element = <ClassComponent>xiaobu</ClassComponent>
// <ClassComponent>xiaobu</ClassComponent> => 转义成 React.createElement( ClassComponent, {},'xiaobu')
console.log(element)
ReactDom.render(element, document.getElementById('root'))