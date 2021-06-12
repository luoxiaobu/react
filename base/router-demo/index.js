import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from './react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';
import Protected from './components/Protected';
import Login from './components/Login';


function APP() {
  return <Router>
    <nav style={{display: 'flex'}}>
      <Link style={{flex:1}} to ='/'>首页</Link>
      <Link style={{flex:1}} to="/user" >用户管理</Link>
      <Link style={{flex:1}} to="/profile" >个人中心</Link>
    </nav>
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/user" component={User} />
      <Protected path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Redirect to="/" />
    </Switch>
  </Router>
}
ReactDOM.render(<APP></APP>, document.getElementById('root'));