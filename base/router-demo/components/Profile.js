import React from 'react';
import { removeItem } from '../utils/storage'
export default class Profile extends React.Component {
    handleClick = ()=>{
        removeItem('login');
        console.log('out')
        if(this.props.history){
            this.props.history.push('/');
        }
    }
    render() {
        return <div>
            Profile
            <button onClick={this.handleClick}>退出登录</button>
        </div>
    }
}