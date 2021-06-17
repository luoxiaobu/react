import React from "react";

import RouterContext from "./RouterContext.js";

/**
 * A public higher-order component to access the imperative API
 */

// 高阶组件 函数接收一个组件参数 返回一个组件
function withRouter(Component) {
    const displayName = `withRouter(${Component.displayName || Component.name})`;

    return (props) => {
        const { wrappedComponentRef, ...remainingProps } = props;
        return (<RouterContext.Consumer>{
            context => {
                return (
                    <Component
                        {...remainingProps}
                        {...context}
                        ref={wrappedComponentRef}
                    />
                );
            }
        }
        </RouterContext.Consumer>
        )
    }
}

export default withRouter;