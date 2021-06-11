import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "./react-router-dom";

/**
 * Router 路由容器，只有一个子元素
 */

import ReactDom from 'react-dom'
export default function App() {
  return (
    <Router>
      <div>
        {/* <Link> a <Link> renders an <a> with a real href*/}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* <Switch>通过其子<Route> s查找，
            渲染与当前URL匹配的第一个。*/}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

ReactDom.render(<App />, document.getElementById('root'))

