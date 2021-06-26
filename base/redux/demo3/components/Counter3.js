import React from "react";

import { createStore, bindActionCreators } from '../redux'

function counterReducer(state = { value: 0 }, action) {
    switch (action.type) {
        case 'increment':
            return { value: state.value + 1 }
        case 'decrement':
            return { value: state.value - 1 }
        default:
            return state
    }
}

function increment() {
    return { type: 'increment' }
}

function decrement() {
    return { type: 'decrement' }
}

let action = {
    increment,
    decrement
}



// Create a Redux store holding the state of your app.
// return  { subscribe, dispatch, getState }.
let store = createStore(counterReducer)

let bindActions = bindActionCreators(action, store.dispatch)
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