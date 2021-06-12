import React from 'react';
import { User } from '../utils/user';
export default class extends React.Component {
    state = { user: {} }
    componentDidMount() {
        // 当页面重新打开时 不存在历史堆栈
        let user = this.props.location.state;
        if (!user) {
            let id = this.props.match.params.id;
            user = User.find(id);
        }
        if (user) {
            this.setState({ user });
        }
    }
    render() {
        let user = this.state.user;
        return (
            <div>
                {user.id}:{user.username}
            </div>
        )
    }
}