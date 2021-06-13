import React from "react";
import { RouterContext} from "../react-router";
import {
    resolveToLocation,
    normalizeToLocation
  } from "./utils/locationUtils.js";
// export default function Link(props) {

//     return (
//         <RouterContext.Consumer>
//             { context => {
//                 const { history } = context;
//                 return <a {...props}
//                     onClick={event => {
//                         event.preventDefault();
//                         history.push(props.to);
//                     }}>{props.children}</a>
//             }}
//         </RouterContext.Consumer>)
// }

const Link = React.forwardRef(({ to, ...rest }, forwardedRef) => {
    return (<RouterContext.Consumer>
        { context => {
            // 简单模范了源码部分实现
            const { history } = context;
            // need creact createHref
            const location = normalizeToLocation(
              resolveToLocation(to, context.location),
              context.location
            );
  
            const href = location ? history.createHref(location) : "";
            const props = { ...rest, href };
            const navigate = () => {
                // 
                const method = history.push;
                method(to);
            }
            return <a {...props}
                onClick={event => {
                    event.preventDefault();
                    navigate();
                }}>{props.children}</a>
        }}
    </RouterContext.Consumer>)
})

export default Link