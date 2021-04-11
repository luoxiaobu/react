class Component {
    constructor(props) {
        this.props = props
        this.state = {}
        this.$updater = new updater(this)
    }
    setState(partialState) {

    }
}
Component.prototype.isReactComponent = {};
export default Component