import React, { useContext } from "react";
import { RouterContext, matchPath } from "../react-router";
import Link from './Link';
export default function NavLink(props) {
    let context = useContext(RouterContext);
    const {
        activeClassName = "active",
        activeStyle,
        className: classNameProp,
        exact,
        isActive: isActiveProp,
        location: locationProp,
        sensitive,
        strict,
        style: styleProp,
        to,
        ...rest
    } = props
    const { pathname } = context.location;
    const isActive = matchPath(pathname, { path: props.to, ...props })
    const className = isActive ? joinClassnames(classNameProp, activeClassName) : classNameProp;
    const style = isActive ? { ...styleProp, ...activeStyle } : styleProp;
    const linkProps = {
        className,
        style,
        to,
        ...rest
    };
    return <Link {...linkProps} />;
}

function joinClassnames(...classnames) {
    return classnames.filter(i => i).join(' ');
}