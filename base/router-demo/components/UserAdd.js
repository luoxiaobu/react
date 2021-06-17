import React from 'react';
import { User } from '../utils/user';
import { Prompt } from '../react-router';
export default class UserAdd extends React.Component {
    constructor() {
        super()
        this.userRef = React.createRef()
        this.state = {
            isBlocking:false //是否要阻止跳转
        }
    }
    add = (event) => {
        event.preventDefault();//阻止默认事件 
        this.setState({isBlocking:false},() => {
            let username = this.userRef.current.value;
            User.add({ id: Date.now() + '', username });
            this.props.history.push('/user/list');
        });
    }
    render() {
        // message: string| fun   when: bool
        return <div>
            <Prompt
            when= {this.state.isBlocking}
                message={(location, action) => {
                    // 此处可以进行一系列逻辑 确认是否弹窗，以及弹窗信息
                    return `Are you sure you want to go to ${location.pathname}?`
                }}
            />
            <input ref={this.userRef} />
            <button type="submit" onClick={this.add}>提交</button>
        </div>
    }
}