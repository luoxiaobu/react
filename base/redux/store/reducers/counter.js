import * as actionTypes from '../action-types';
const preloadedState = { value: 2 };

export default function reducer(state = preloadedState, action) {
    switch (action.type) {
        case actionTypes.DECREMENT:
            return { value: state.value - 1 };
        case actionTypes.INCREMENT:
            return { value: state.value + 1 };
        default:
            return state;
    }
}
