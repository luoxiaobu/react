import React from "react";
import store from "../store";
import actions from '../store/actions/counter4';
import { bindActionCreators } from 'redux'


let bindActions = bindActionCreators(actions, store.dispatch)
export default class extends React.Component {

    state = store.getState().counter4

    componentDidMount() {
        this.unSubscribe = store.subscribe(() => {
            console.log('counter4')
            this.setState(store.getState().counter4)
        })
    }
    componentWillUnmount() {
        this.unSubscribe()
    }
    render() {
        return (
            <div>
                <p>{this.state.value}</p>
                <button onClick={bindActions.increment4}>+</button>
                <button onClick={bindActions.decrement4}>-</button>
            </div>
        )
    }

}