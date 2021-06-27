import counter from './counter';
import counter4 from './counter4';

import { combineReducers } from 'redux';


let reducers = {
    counter,
    counter4,
}

let combine = combineReducers(reducers)

export default combine