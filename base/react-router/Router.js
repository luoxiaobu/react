import React from 'react';
import RouterContext from './RouterContext';

class Router extends React.Component {
    //<Router history={this.history} children={this.props.children}></Router>
    static computeRootMatch(pathname) {
        return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
    }
    constructor(props) {
        super(props)
        this.state = {
            location: props.history.location
        }
        // 当历史记录变化的时候 执行setState 让组件重新渲染

        // This is a bit of a hack. We have to start listening for location
        // changes here in the constructor in case there are any <Redirect>s
        // on the initial render. If there are, they will replace/push when
        // they mount and since cDM fires in children before parents, we may
        // get a new location before the <Router> is mounted.
        this._isMounted = false;
        this._pendingLocation = null;

        // 为什么要保证 挂载了才执行？ 保证代码执行顺序？
        if (!props.staticContext) {
            this.unlisten = props.history.listen(location => {
                if (this._isMounted) {
                    this.setState({ location });
                } else {
                    this._pendingLocation = location;
                }
            });
        }
    }
    componentDidMount() {
        this._isMounted = true;

        if (this._pendingLocation) {
            this.setState({ location: this._pendingLocation });
        }
    }
    componentWillUnmount() {
        // 取消订阅监听
        if (this.unlisten) {
            this.unlisten();
            this._isMounted = false;
            this._pendingLocation = null;
        }
    }
    render() {
        //  match: Router.computeRootMatch(this.state.location.pathname)
        // 在workInProgress  过程中有更新 ？？？？
        return <RouterContext.Provider value={{
            history: this.props.history,
            location: this.state.location,
            match: Router.computeRootMatch(this.state.location.pathname),
            // staticContext: this.props.staticContext
        }}>
            {this.props.children}
        </RouterContext.Provider>
    }
}

export default Router;