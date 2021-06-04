import React from 'react';
import RouterContext from './RouterContext';
import mathPath from './matchPath';
class Route extends React.Component {
    render() {
        <RouterContext.Consumer>
            {
                context => {
                    const location = this.props.location || context.location;
                    const { history } = context
                    let { component, computedMatch, render, children } = this.props
                }
            }
        </RouterContext.Consumer>
    }
}