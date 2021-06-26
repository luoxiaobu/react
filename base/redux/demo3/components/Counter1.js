import React from "react";
import store from "../store";
import actions from '../store/actions/counter';
import { bindActionCreators } from 'redux'


let bindActions = bindActionCreators(actions, store.dispatch)
export default class extends React.Component {

    state = store.getState()

    componentDidMount() {
        this.unSubscribe = store.subscribe(() => {
            this.setState(store.getState())
        })
    }
    componentWillUnmount() {
        this.unSubscribe()
    }
    render() {
        return (
            <div>
                <p>{this.state.value}</p>
                <button onClick={bindActions.increment}>+</button>
                <button onClick={bindActions.decrement}>-</button>
            </div>
        )
    }

}