import React from 'react'
import RouterContext from './RouterContext'
import matchPath from './matchPath';
class Switch extends React.Component {

    render() {
        return (
            <RouterContext.Consumer>
                {
                    context => {
                        let location = context.location;
                        // children 可能是一个字符串，可能是一个对象，也可能是个数组
                        // 此处用公用方法统一处理
                        let element, match;
                        React.Children.forEach(this.props.children, child => {
                            if (!match && React.isValidElement(child)) {
                                // const path = child.props.path
                                element = child
                                // Redirect组件 的路径来自 from, 匹配成功后 Redirect 会处理路径到 to 的处理
                                const path = child.props.path || child.props.from;
                                match = matchPath(location.pathname, { ...child.props, path })
                            }
                        });
                        return match ? React.cloneElement(element, { location, computedMatch: match }) : null;
                    }
                }
            </RouterContext.Consumer>
        )
    }
}

export default Switch;