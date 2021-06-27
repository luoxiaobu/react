
export default function combineReducers(reducers) {
    const reducerKeys = Object.keys(reducers);
    const finalReducers = {};
    for (let i = 0; i < reducerKeys.length; i++) {
        const key = reducerKeys[i];
        // 判断合并的reducer 都是function 类型
        if (typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key];
        }
    }

    const finalReducerKeys = Object.keys(finalReducers);

    // 返回一个综合的reducer 函数， 函数返回值是更新的 state
    return function combination(state = {}, action) {
        let hasChanged = false;
        const nextState = {};
        for (let i = 0; i < finalReducerKeys.length; i++) {
            let key = finalReducerKeys[i];
            let reducer = finalReducers[key];
            const previousStateForKey = state[key];
            const nextStateForKey = reducer(previousStateForKey, action);
            // hasChanged = hasChanged ? hasChanged : previousStateForKey !== nextStateForKey
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        // 长度变化？
        hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
        return hasChanged ? nextState : state
    }
}

// 无关变化的 listener 都会执行 代码优化？
// function dispatch(action) {
//     currentState = currentReducer(currentState, action);
//     for (let i = 0; i < currentListeners.length; i++) {
//         const listener = currentListeners[i];
//         listener();
//     }
//     return action;
// }


// export default function reducer(state = preloadedState, action) {
//     switch (action.type) {
//         case actionTypes.DECREMENT:
//             return { value: state.value + 1 };
//         case actionTypes.INCREMENT:
//             return { value: state.value - 1 };
//         default:
//             return state;
//     }
// }