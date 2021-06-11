import React from "react";
import { Router } from "../react-router";

import { createHashHistory as createHistory } from "../history";
class HashRouter extends React.Component {
    history = createHistory(this.props);
    render() {
        return <Router history={this.history} children={this.props.children}></Router>
    }
}

export default HashRouter;