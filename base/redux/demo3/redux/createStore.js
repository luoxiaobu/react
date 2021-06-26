
import ActionTypes from './utils/ActionTypes';
function createStore(reducer, preloadedState) {
    let currentReducer = reducer
    let currentState = preloadedState
    let currentListeners = []

    function getState() {
        return currentState;
    }

    function subscribe(listener) {
        currentListeners.push(listener);
        return function unsubscribe() {
            const index = currentListeners.indexOf(listener);
            currentListeners.splice(index, 1);
        }
    }

    function dispatch(action) {
        currentState = currentReducer(currentState, action);
        for (let i = 0; i < currentListeners.length; i++) {
            const listener = currentListeners[i];
            listener();
        }
        return action;
    }
    // 初始化 数据
    dispatch({ type: ActionTypes.INIT });

    const store = {
        getState,
        dispatch,
        subscribe
    }

    return store;
}

export default createStore;