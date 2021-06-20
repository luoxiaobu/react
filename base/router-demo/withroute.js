import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect, NavLink } from './components/react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';
import Protected from './components/Protected';
import Login from './components/Login';
import "./index.css";
import NavHeader from './components/NavHeader';


function APP() {
  return <Router>
    <NavHeader></NavHeader>
    <nav style={{display: 'flex'}}>
      <NavLink activeClassName= {'activeClassName'} style={{flex:1}} to ='/' exact>首页</NavLink>
      <NavLink activeClassName= {'activeClassName'}style={{flex:1}} to="/user" >用户管理</NavLink>
      <NavLink activeClassName= {'activeClassName'}style={{flex:1}} to="/profile" >个人中心</NavLink>
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