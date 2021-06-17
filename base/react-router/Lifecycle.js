import React from 'react';

class Lifecycle extends React.Component {

    componentDidMount() {
        if (this.props.onMount) {
            this.props.onMount.call(this, this)
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.onUpdate) {
            // prevProps 方便数据比较
            this.props.onUpdate.call(this, this, prevProps)
        }
    }

    componentWillUnmount() {
        if (this.props.onUnmount) {
            console.log('Lifecycle: componentWillUnmount')
            this.props.onUnmount.call(this, this)
        }
    }

    render() {
        return null
    }
}

export default Lifecycle;