import React from 'react';
import { User } from '../utils/user';
import { Link } from './react-router-dom';
export default class extends React.Component {
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
        return (<ul>{
            this.state.users.map((user, index) => {
                return (<li style={{ display: 'flex' }} key={user.id}>
                    <Link style={{ flex: 1 }} to={{ pathname: `/user/detail/${user.id}`, state: user }}>{`${user.id}-${user.username}`}</Link>
                    <button type="submit" onClick={() => { this.move(user.id) }}>移除</button>
                </li>)
            })
        }</ul>)
    }

}