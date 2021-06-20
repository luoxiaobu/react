import React from 'react';

import ReactDom from 'react-dom'

import { BrowserRouter as Router, Route, useParams, Link } from 'react-router-dom'
import { User } from './utils/user';


function UserDetial() {
  let userID = useParams().id
  let user = User.find(userID) || {};
  return <>
    <div>用户Id:{userID}</div>{
      console.log(123)
    }
    <div>用户姓名:{user.username}</div>
  </>
}
console.log(Router)


export default class App extends React.Component {
  state = { users: [] }
  componentDidMount() {
    let users = User.list();
    this.setState({ users });
  }

  move = (id) => {
    User.remove(id)
    let users = User.list();
    this.setState({ users });
  }

  render() {
    return (
      <Router><ul>{
        this.state.users.map((user, index) => {
          return (<li style={{ display: 'flex' }} key={user.id}>
            <Link style={{ flex: 1 }} to={{ pathname: `/user/${user.id}`, state: user }}>{`${user.id}-${user.username}`}</Link>
            <button type="submit" onClick={() => { this.move(user.id) }}>移除</button>
          </li>)
        })
      }</ul>
        <Route path='/user/:id' component={UserDetial}></Route>
      </Router>)
  }

}


ReactDom.render(<App></App>, document.getElementById('root'))