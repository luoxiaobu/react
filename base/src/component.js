import { isFunction } from './utils'
import { createDom } from './react-dom';

//定义并导出一个变量updateQueue
export let updateQueue = {
    // 是否处于批量更新
    isBatchingUpdate: false,
    // 批量更新，更新器的数组
    updaters: [],
    add(updater) {
        // if (!this.updaters.includes(updater)) {
        this.updaters.push(updater);
        // }
    },
    //先通过add 方法添加updater,然后合适的时间进行批量更新。
    //即一次性更新完updaters
    batchUpdate() {
        this.isBatchingUpdate = true;
        //把数组中的updaters全部取出,进行批量或者说全量更新
        this.updaters.forEach((updater) => {
            updater.updateComponent();
        });
        // ???
        this.updaters.length = 0;
        this.isBatchingUpdate = false;
    }
};
class Updater {
    constructor(classInstance) {
        this.classInstance = classInstance;
        //数组缓存所有更新状态
        this.pendingState = [];
    }

    addState(partialState) {
        //先把分状态或者更新函数放进数组中进行缓存。
        this.pendingState.push(partialState);
        //当前是否处于批量更新模式，如果是就先添加到队列，等待更新。
        //updateQueue 这个执行时机很巧妙了
        //否则，直接更新。
        updateQueue.isBatchingUpdate ? updateQueue.add(this) : this.updateComponent();
    }

    // 让组件进行更新
    updateComponent() {
        let { classInstance, pendingState } = this;
        let { state } = classInstance;
        if (pendingState.length > 0) {
            classInstance.state = this.getState();
            classInstance.forceUpdate();
        };
    }

    // 获取组件的新状态
    getState() {
        let { classInstance, pendingState } = this;
        let { state } = classInstance;
        let nextState = state;
        // state 在这个循环中重来没有变过，所以非函数用的一直是state
        pendingState.forEach((partialState) => {
            if (isFunction(partialState)) {
                nextState = {...nextState, ...partialState(nextState) }
            } else {
                nextState = {...nextState, ...partialState }
            }
        })
        pendingState.length = 0;
        return nextState;
    }
}
class Component {
    constructor(props) {
        this.props = props;
        this.state = {};
        // 组件的更新器
        this.$updater = new Updater(this)
    }

    // 只放分状态
    setState(partialState) {
        this.$updater.addState(partialState)
    }

    //让组件的状态改变，得到新的虚拟DOM,然后从新的虚拟DOm得到新的真实DOM
    // 然后让新的替换老的
    forceUpdate() {
        // 一个用JS描述dom结构的对象
        // 组件的render方法只会得到vdom 结构
        let newVdom = this.render();
        let newDom = createDom(newVdom)
        let oldDom = this.dom;
        oldDom.parentNode.replaceChild(newDom, oldDom);
        this.dom = newDom;

    }
}
Component.prototype.isReactComponent = {};
export default Component