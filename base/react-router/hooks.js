import React from 'react';
import RouterContext from './RouterContext';
import matchPath from "./matchPath.js";

// RouterContext 的value 更新 workInProgress  过程中有更新
export function useParams() {
  let context = React.useContext(RouterContext);
  return context.match ? context.match.params : {};
}

export function useLocation() {
  let context = React.useContext(RouterContext);
  return context.location;
}

export function useHistory() {
  let context = React.useContext(RouterContext);
  return context.history;
}

export function useRouteMatch(path) {
 
  const location = useLocation();
  const match = useContext(RouterContext).match;
  return path ? matchPath(location.pathname, path) : match;
}