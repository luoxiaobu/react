import react from 'react';

import ReactDom from 'react-dom';

import Counter from './components/Counter2'

function APP() {

  return (<div>
    <Counter></Counter>
  </div>)
}

ReactDom.render(<APP></APP>, document.getElementById('root'))



