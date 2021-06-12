import React from 'react';
import { User } from '../utils/user';
export default class UserAdd extends React.Component {
    constructor() {
        super()
        this.userRef = React.createRef()
    }
    add = (event) => {
        event.preventDefault();//阻止默认事件 
        this.setState(() => {
            let username = this.userRef.current.value;
            User.add({id:Date.now()+'',username});
            this.props.history.push('/user/list');
        });
    }
    render() {
        return <div>
            <input ref={this.userRef}/>
            <button type="submit" onClick={this.add}>提交</button>
        </div>
    }
}