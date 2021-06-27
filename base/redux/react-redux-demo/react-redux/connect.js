import React from 'react';
import ReactReduxContext from './Context';

import { bindActionCreators } from 'redux';

export default function connect(mapStateToProps, mapDispatchToProps) {

    return function (WrappedComponent) {
        return class extends React.Component {
            static contextType = ReactReduxContext
            constructor(props, context) {
                super(...arguments);
                this.state = mapStateToProps(context.store.getState())
            }

            componentDidMount() {
                this.unSubscribe = this.context.store.subscribe(() => {
                    //  // 是一种覆盖拷贝
                    this.setState(mapStateToProps(this.context.store.getState()))
                })
            }

            componentWillUnmount() {
                this.unSubscribe()
            }


            render() {
                let boundActions = bindActionCreators(mapDispatchToProps, this.context.store.dispatch)
                return <WrappedComponent {...this.state} {...boundActions}></WrappedComponent>
            }
        }
    }


}