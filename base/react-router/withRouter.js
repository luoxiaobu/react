import React from "react";

import RouterContext from "./RouterContext.js";

/**
 * A public higher-order component to access the imperative API
 */

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