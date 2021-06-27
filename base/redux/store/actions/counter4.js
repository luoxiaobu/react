import * as actionTypes from '../action-types';

//actionCreators
export default {
    increment4() {
        return { type: actionTypes.INCREMENT4 };
    },
    decrement4() {
        return { type: actionTypes.DECREMENT4 };
    }
}