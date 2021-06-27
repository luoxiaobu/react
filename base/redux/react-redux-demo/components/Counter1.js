import React from "react";
import actions from '../store/actions/counter';
import { connect } from 'react-redux';

class Counter extends React.Component {

    render() {
        return (
            <div>
                <p>{this.props.value}</p>
                <button onClick={this.props.increment}>+</button>
                <button onClick={this.props.decrement}>-</button>
            </div>
        )
    }

}

let mapStateToProps = (state) => state.counter

export default connect(mapStateToProps, actions)(Counter)