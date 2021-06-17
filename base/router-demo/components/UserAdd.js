import React from 'react';
import { User } from '../utils/user';
import { Prompt } from '../react-router';
export default class UserAdd extends React.Component {
    constructor() {
        super()
        this.userRef = React.createRef()
    }
    add = (event) => {
        event.preventDefault();//阻止默认事件 
        this.setState(() => {
            let username = this.userRef.current.value;
            User.add({ id: Date.now() + '', username });
            this.props.history.push('/user/list');
        });
    }
    render() {
        // message: string| fun   when: bool
        return <div>
            <Prompt
                message={(location, action) => {
                    if (action === 'POP') {
                        console.log("Backing up...")
                    }
                    console.log("Backing up...")
                    return location.pathname.startsWith("/app")
                        ? true
                        : `Are you sure you want to go to ${location.pathname}?`
                }}
            />
            <input ref={this.userRef} />
            <button type="submit" onClick={this.add}>提交</button>
        </div>
    }
}