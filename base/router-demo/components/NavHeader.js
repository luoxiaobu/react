import React from 'react';
// import {withRouter} from 'react-router-dom';
import {withRouter} from '../react-router-dom';
class NavHeader extends React.Component{

    render() {
        return <h1 onClick={()=>this.props.history.push('/')}>test withRouter</h1>
    }
}

export default withRouter(NavHeader)