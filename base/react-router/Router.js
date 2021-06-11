import React from 'react';
import RouterContext from './RouterContext';

class Router extends React.Component {
    //<Router history={this.history} children={this.props.children}></Router>
    constructor(props) {
        super(props)
        this.state = {
            location: props.history.location
        }
    // 当历史记录变化的时候 执行setState 让组件重新渲染
        this.unlisten = this.props.history.listen((location) => {
            this.setState({ location })
        })
    }
    componentWillUnmount() {
        // 取消订阅监听
        if (this.unlisten) {
            this.unlisten();
        }
    }
    render() {
        return <RouterContext.Provider value={{
            history: this.props.history,
            location: this.state.location
            // match: Router.computeRootMatch(this.state.location.pathname),
            // staticContext: this.props.staticContext
        }}>
            {this.props.children}
        </RouterContext.Provider>
    }
}

export default Router;