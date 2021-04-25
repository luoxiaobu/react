// 核心库 与渲染平台无关
import React from 'react'

//渲染库 可以把react渲染到不同平台上 react-dom react-native react-canvas
import ReactDom from 'react-dom'

// let element2 = <h1 title="123" className="title"><span>xiaobu</span>hello<span>world</span ></h1>
// // JXS 需要babel的转义 转移成createElement 片段
// let element = React.createElement("h1", {
//     title: "123",
//     className: 'title'
// }, React.createElement("span", null, "xiaobu"), " hello ", React.createElement("span", null, " world"))
// console.log(element2)


// let names = ['王力宏', '迪丽热巴','景甜']
// let template = <ul>{names.map((item)=><li>{item}</li>
// )}</ul>

// ReactDom.render(template, document.getElementById('root'))


//函数式组件

// function Welcome(props) {
//     return <h1>hello {props.name}</h1>
// }

// 类组件
// 需要继承 react.component 
// 需要返回 render 方法
// class Welcome extends React.Component{
//     constructor(props){
//         super(props)
//     }
//     render() {
//         return <><h1>hello1 {this.props.name}</h1><h1>hello1 {this.props.name}</h1></>
//     }
// }

// ReactDom.render(<Welcome name="xiaobu"></Welcome>,document.getElementById('root'))



//组件的拆分
// class PanelHead extends React.Component {


//     render () {
//         return <div>header</div>
//     }
// }
// class PanelBody extends React.Component {


//     render () {
//         return <div>body</div>
//     }
// }

// class PanelFooter extends React.Component{

//     render(){
//         return <div>footer</div>
//     }
// }
// class Panel extends React.Component {


//     render () {
//         return <><PanelHead/><PanelBody/><PanelFooter/></>
//     }
// }


// ReactDom.render(<Panel/>,document.getElementById('root'))