import React from "react";
import { __RouterContext as RouterContext } from "react-router";

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
            const href = to
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