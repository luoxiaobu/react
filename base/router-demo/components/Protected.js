import React from 'react';
import { Route, Redirect } from '../react-router-dom';
import { getItem } from '../utils/storage'
export default function(props) {
    let { component: RouteComponent, path, ...rest } = props;
    return ( <
        Route path = { path }
        render = {
            (routeProps) => {
                let allProps = {...rest, ...routeProps }
                return getItem('login') ? < RouteComponent {...allProps }
                /> :<Redirect to={{ pathname: '/Login', state: { from: routeProps.location.pathname } }} />
            }
        } >

        </Route>
    )
}