import React, { Suspense, lazy } from 'react';

import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// React.lazy 接受一个函数，这个函数需要动态调用 import()。
// 它必须返回一个 Promise，该 Promise 需要 resolve 一个 default export 的 React 组件。

// 然后应在 Suspense 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级（如 loading 指示器等）。
// const Home = React.lazy(() => import('./components/Home'))
// const UserList = React.lazy(() => import('./components/UserList'))
// const UserDetial = React.lazy(() => import('./components/UserDetail'))

// 失败处理 了？
const Home = lazy(() => import('./components/Home'))
const UserList = lazy(() => import('./components/UserList'))
const UserDetial = lazy(() => import('./components/UserDetail'))

// console.log(Suspense)
// function lazy(load) {
//   return class extends React.Component {
//     state = { Component: null }
//     componentDidMount() {
//       load().then(result => {
//         this.setState({ Component: result.default || result })
//       })
//     }
//     render() {
//       let { Component } = this.state;
//       return Component ? <Component {...this.props} /> : null;
//     }
//   }
// }

// jsonp 原理值得理解一下
function App() {
  return <Router>
    <nav style={{ display: 'flex' }}>
      <Link style={{ flex: 1 }} to='/'>首页</Link>
      <Link style={{ flex: 1 }} to="/user" >用户中心</Link>
    </nav>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/user" exact component={UserList} />
        <Route path="/user/:id" component={UserDetial} />
      </Switch>
    </Suspense>
  </Router>
}

ReactDom.render(<App></App>, document.getElementById('root'))