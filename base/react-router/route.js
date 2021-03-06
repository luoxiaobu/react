import React from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';
class Route extends React.Component {
    render() {
        return <RouterContext.Consumer>
            {
                context => {
                    const location = this.props.location || context.location;
                    let { component, computedMatch, render, children } = this.props;
                    let match = computedMatch? computedMatch:matchPath(location.pathname, this.props)
                    let props = { ...context, location, match }
                    if (match) {
                        if (children) {
                            if (typeof children === "function") {
                                return children(props)
                            }
                            return children
                        } else if (component) {
                            return React.createElement(component, props)
                        } else if (render) { // 用于告诉组件此处需要渲染什么
                            return render(props)
                        }
                        return null;
                    } else {
                        if (typeof children === "function") {
                            return children(props);
                        }
                        return null;
                    }
                }
            }
        </RouterContext.Consumer>
    }
}

export default Route