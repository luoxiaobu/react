/**
 * https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/Link.js
 * 
 */

import React from "react";
import { __RouterContext as RouterContext } from "react-router";
// react.createContext() 创建了一个对象 导出 RouterContext
import {
    resolveToLocation,
    normalizeToLocation
} from "./utils/locationUtils.js";

// React 15 compat
const forwardRefShim = C => C;
let { forwardRef } = React;
if (typeof forwardRef === "undefined") {
    forwardRef = forwardRefShim;
}

function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

// 用forwardRef 包裹一层对参数进行了处理。 在高阶组件中转发 refs
const LinkAnchor = forwardRef(
    (
        {
            innerRef, // TODO: deprecate
            navigate,
            onClick,
            ...rest
        },
        forwardedRef
    ) => {
        const { target } = rest;
        // onClick 事件处理
        let props = {
            ...rest,
            onClick: event => {
                try {
                    if (onClick) onClick(event);
                } catch (ex) {
                    event.preventDefault();
                    throw ex;
                }

                if (
                    !event.defaultPrevented && // onClick prevented default
                    event.button === 0 && // ignore everything but left clicks
                    (!target || target === "_self") && // let browser handle "target=_blank" etc.
                    !isModifiedEvent(event) // ignore clicks with modifier keys
                ) {
                    event.preventDefault();
                    navigate();
                }
            }
        };

        // 用forwardRef 包裹一层对参数进行了处理。 转发 forwardedRef（ref 并不会当props 的属性传递）
        // React 15 compat
        if (forwardRefShim !== forwardRef) {
            props.ref = forwardedRef || innerRef;
        } else {
            props.ref = innerRef;
        }

        /* eslint-disable-next-line jsx-a11y/anchor-has-content */
        return <a {...props} />;
    }
);

// if (__DEV__) {
//     LinkAnchor.displayName = "LinkAnchor";
// }

/**
 * The public API for rendering a history-aware <a>.
 */
const Link = forwardRef(
    (
        {
            component = LinkAnchor,
            replace,
            to,
            innerRef, // TODO: deprecate
            ...rest
        },
        forwardedRef
    ) => {
        return (
            <RouterContext.Consumer>
                {context => {
                    //   invariant(context, "You should not use <Link> outside a <Router>");
                    // 路由导航处理， 共享值
                    const { history } = context;

                    const location = normalizeToLocation(
                        resolveToLocation(to, context.location),
                        context.location
                    );

                    const href = location ? history.createHref(location) : "";
                    const props = {
                        ...rest,
                        href,
                        navigate() {
                            const location = resolveToLocation(to, context.location);
                            const method = replace ? history.replace : history.push;

                            method(location);
                        }
                    };

                    // React 15 compat
                    if (forwardRefShim !== forwardRef) {
                        props.ref = forwardedRef || innerRef;
                    } else {
                        props.innerRef = innerRef;
                    }

                    return React.createElement(component, props);
                }}
            </RouterContext.Consumer>
        );
    }
);


export default Link;