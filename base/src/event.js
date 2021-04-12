import { updateQueue } from './component';
/**
 *绑定事件委托到document上
 *
 * @export
 * @param {*} dom
 * @param {*} eventType
 * @param {*} listener
 */
export function addEvent(dom, eventType, listener) {
    // 将事件存储到dom 元素上的一个对象上
    console.log('addEvent')
    let store = dom.store || (dom.store = {});
    store[eventType] = listener;
    //document.addEventListener(type,listener,是否冒泡阶段捕获)
    //事件委托，都委托到documentshang
    document.addEventListener(eventType.slice(2), dispatchEvent, false)
}

/**
 *实现合成事件
 为了性能，快速回收event对象？
 *为了兼容？？
 * 实现批量更新
 * @param {*} event
 */

// 合成事件对象
let syntheticEvent = {}

function dispatchEvent(event) {
    let { target, type } = event;
    let eventType = 'on' + type;
    let listener = target.store && target.store[eventType];
    if (listener) {
        //让合成事件的nativeEvent指向真实的事件对象
        syntheticEvent.nativeEvent = event;
        for (let key in event) {
            syntheticEvent[key] = event[key]
        }
        updateQueue.isBatchingUpdate = true;
        listener.call(target, syntheticEvent);
        // updateQueue.isBatchingUpdate = false;
        updateQueue.batchUpdate()
        for (let key in event) {
            syntheticEvent[key] = null;
        }
    }
    // 拿的 target.parentNode 上面并没有 isPropagationStopped
    // while (target) {
    //     let listener = target.store && target.store[eventType]
    //     if (listener) {
    //         //让合成事件的nativeEvent指向真实的事件对象
    //         syntheticEvent.nativeEvent = event;
    //         for (let key in event) {
    //             syntheticEvent[key] = event[key]
    //         }
    //         listener.call(target, syntheticEvent)
    //         for (let key in event) {
    //             syntheticEvent[key] = null;
    //         }
    //     }
    //     target = target.parentNode;
    // }
}