import React from 'react';
import { setItem} from '../utils/storage'
export default class Login extends React.Component{
    handleClick = ()=>{
        setItem('login','true');
        if(this.props.location.state){
            this.props.history.push(this.props.location.state.from);
        }
    }
    render(){
        return (
            <button onClick={this.handleClick}>登录</button>
        )
    }
}