import react from 'react';

import ReactDom from 'react-dom';

import Counter from './components/Counter1'
import Counter4 from './components/Counter4'

function APP() {

  return (<div>
    <Counter></Counter>
    <Counter4></Counter4>
  </div>)
}

ReactDom.render(<APP></APP>, document.getElementById('root'))



