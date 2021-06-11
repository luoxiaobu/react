import React from 'react';

class Lifecycle extends React.Component {

    componentDidMount() {
        if (this.props.onMount) {
            console.log('123')
            this.props.onMount.call(this, this)
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.onUpdate) {
            this.props.onUpdate.call(this, this, prevProps)
        }
    }

    componentWillUnmount() {
        if (this.props.onUnmount) {
            this.props.onUnmount.call(this, this)
        }
    }

    render() {
        return null
    }
}

export default Lifecycle;