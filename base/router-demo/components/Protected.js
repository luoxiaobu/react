import React from 'react';
import { Route, Redirect } from './react-router-dom';
import { getItem } from '../utils/storage'
export default function(props) {
    //render props 
    // 告诉组件需要渲染什么
    // 组件实现内部调用props.render
    let { component: RouteComponent, path, ...rest } = props;
    return ( <Route path = { path }
        render = {(routeProps) => {
                let allProps = {...rest, ...routeProps }
                return getItem('login') ? <RouteComponent {...allProps }/> :<Redirect to={{ pathname: '/Login', state: { from: routeProps.location.pathname } }} />
            }
        }>
        </Route>
    )
}