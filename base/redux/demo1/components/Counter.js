import React from "react";

import { createStore } from 'redux'

// 抄个例子

/**
 * This is a reducer - a function that takes a current state value and an
 * action object describing "what happened", and returns a new state value.
 * A reducer's function signature is: (state, action) => newState
 * 这是一个 reducer - 一个函数，它接受一个当前状态值和一个
 * 描述“发生了什么”的动作对象，并返回一个新的状态值。
 * 
 * The Redux state should contain only plain JS objects, arrays, and primitives.
 * The root state value is usually an object.  It's important that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * You can use any conditional logic you want in a reducer. In this example,
 * we use a switch statement, but it's not required.
 */



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