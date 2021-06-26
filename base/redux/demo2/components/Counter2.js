import React from "react";

import { createStore } from '../redux'

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


// Create a Redux store holding the state of your app.
// return  { subscribe, dispatch, getState }.
let store = createStore(counterReducer)

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
                <button onClick={() => store.dispatch({ type: 'increment' })}>+</button>
                <button onClick={() => store.dispatch({ type: 'decrement' })}>-</button>
            </div>
        )
    }

}