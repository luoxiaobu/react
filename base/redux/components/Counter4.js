import React from "react";
import actions from '../store/actions/counter4';
import { connect } from '../react-redux'


class Counter4 extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.value}</p>
                <button onClick={this.props.increment4}>+</button>
                <button onClick={this.props.decrement4}>-</button>
            </div>
        )
    }

}

const mapStateToProps = state => state.counter4;

export default connect(mapStateToProps, actions)(Counter4)