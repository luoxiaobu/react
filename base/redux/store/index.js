import { createStore } from '../redux';
import combinedReducers from './reducers';

let store = createStore(combinedReducers)

export default store