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



// 反向继承
class Button extends React.Component {
    componentDidMount(){
        console.log('Button componentDidMount');
    }
    render() {
        console.log('Button render');
        return <button>{this.props.default}</button>
    }
}

const Wrapper = oldComponent => {
    return class HOC extends oldComponent {
        componentDidMount(){
            console.log('componentDidMount');
            super.componentDidMount();
        }

        render() {
            // 此处得到是一个对象VDOM
            let renderElement = super.render();
            console.log(renderElement)
            let newProps = {
                ...renderElement.props,
                ...this.props
            }
            //把渲染的内容给改掉了
            // React.cloneElement(
            //     element,
            //     [props],
            //     [...children]
            //   )
            return  React.cloneElement(
                renderElement,
                newProps
            );

            //等价于  <oldComponent {...element.props} {...props}>{children}</oldComponent>
        }
    }
}

let HigButtonComponent = Wrapper(Button)
ReactDom.render(<HigButtonComponent default={'菜单'} />, document.getElementById('root'))
