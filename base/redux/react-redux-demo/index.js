import react from 'react';

import ReactDom from 'react-dom';
//Redux 官方提供的 React 绑定库。 具有高效且灵活的特性。
import { Provider } from 'react-redux';

import store from './store'

import Counter from './components/Counter1'
import Counter4 from './components/Counter4'

function APP() {

  return (<Provider store={store}>
    <Counter></Counter>
    <Counter4></Counter4>
  </Provider>)
}

ReactDom.render(<APP></APP>, document.getElementById('root'))
