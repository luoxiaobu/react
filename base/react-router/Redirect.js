import React from 'react';
import RouterContext from './RouterContext';

import Lifecycle from './Lifecycle'

function Redirect({ computedMatch, to, push = false }) {
    return (
        <RouterContext.Consumer>
            {context => {
                const { history } = context;//history location
                const method = push ? history.push : history.replace;
                return <Lifecycle onMount={() => method(to)}></Lifecycle>
            }}
        </RouterContext.Consumer>
    )
}


export default Redirect;
