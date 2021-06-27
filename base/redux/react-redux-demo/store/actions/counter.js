import * as actionTypes from '../action-types';

//actionCreators
export default {
    increment() {
        return { type: actionTypes.INCREMENT };
    },
    decrement() {
        return { type: actionTypes.DECREMENT };
    }
}