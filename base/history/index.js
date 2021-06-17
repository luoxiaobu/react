/**
 * https://github.com/ReactTraining/history/blob/master/packages/history/index.ts
 * 
 * "history": "^4.9.0",
 * https://github.com/ReactTraining/history/tree/v4.9.0/modules
 *  
 * 主要区分 popState 和 pushState 
 */




//  History.go()
//  通过当前页面的相对位置从浏览器历史记录( 会话记录 )加载页面。比如：参数为-1的时候为上一页，参数为1的时候为下一页. 当整数参数超出界限时( 译者注:原文为When integerDelta is out of bounds )，例如: 如果当前页为第一页，前面已经没有页面了，我传参的值为-1，那么这个方法没有任何效果也不会报错。调用没有参数的 go() 方法或者参数值为0时，重新载入当前页面。( 这点与支持字符串作为url参数的IE有点不同)。

//  History.pushState()
//  按指定的名称和URL（如果提供该参数）将数据push进会话历史栈，数据被DOM进行不透明处理；你可以指定任何可以被序列化的javascript对象。注意到Firefox现在忽略了这个title参数，更多的信息，请看manipulating the browser history.

//  History.replaceState()


// 扩展后返回的对象
/**
 *  action: "POP"
    block: ƒ block(prompt)
    createHref: ƒ createHref(location)
    go: ƒ go(n)
    goBack: ƒ goBack()
    goForward: ƒ goForward()
    length: 1
    listen: ƒ listen(listener)
    location: {pathname: "/", search: "", hash: "", state: undefined}
    push: ƒ push(path, state)
    replace: ƒ replace(path, state)
 */



//?????? 此处还有疑惑
// https://developer.mozilla.org/zh-CN/docs/Web/API/Window/beforeunload_event
function promptBeforeUnload(event) {
    // Cancel the event.
    event.preventDefault();
    // Chrome (and legacy IE) requires returnValue to be set.
    event.returnValue = '';
}

function getConfirmation(message) {
    return window.confirm(message);
}

function createEvents() {
    let handlers = [];

    return {
        get length() {
            return handlers.length;
        },
        push(fn) {
            handlers.push(fn);
            return function () {
                handlers = handlers.filter(handler => handler !== fn);
            };
        },
        call(arg) {
            // 一个页面有一个弹窗不好么？
            return handlers.map(fn => fn && fn(arg));
        }
    };
}
export function parsePath(path) {
    let partialPath = {};
    if (path) {
        let hashIndex = path.indexOf('#');
        if (hashIndex >= 0) {
            partialPath.hash = path.substr(hashIndex);
            path = path.substr(0, hashIndex);
        }
        let searchIndex = path.indexOf('?');
        if (searchIndex >= 0) {
            partialPath.search = path.substr(searchIndex);
            path = path.substr(0, searchIndex);
        }
        if (path) {
            partialPath.pathname = path;
        }
    }
    return partialPath;
}

export function createPath({ pathname = '/', search = '', hash = '' }) {
    return pathname + search + hash;
}



export function createBrowserHistory(props) {

    function getIndexAndLocation() {
        let { pathname, search, hash } = window.location;
        let state = globalHistory.state || { idx: null };
        return [
            state.idx,
            {
                pathname,
                search,
                hash,
                state: state.usr || null
            }
        ];
    }

    function getNextLocation(to, state = null) {
        return {
            state,
            ...location,
            ...(typeof to === 'string' ? parsePath(to) : to)
        }
    }

    function createHref(to) {
        return typeof to === 'string' ? to : createPath(to);
    }

    function getHistoryStateAndUrl(nextLocation, index) {
        return [{
            usr: nextLocation.state,
            idx: index
        },
        createHref(nextLocation)
        ];
    }
    // window.history 上扩展包装
    var globalHistory = window.history;
    let listeners = createEvents();
    let blockers = createEvents();
    let action = 'POP';
    let [index, location] = getIndexAndLocation();
    // 初始化 历史栈
    if (index == null) {
        index = 0;
        globalHistory.replaceState(Object.assign(Object.assign({}, globalHistory.state), { idx: index }), '');
    }
    // 确认是否离开路由
    function allowTx(action, location, retry) {
        if (!blockers.length) {
            return true;
        }
        let [result] = blockers.call(location, action, retry)
        if (typeof result === 'string') {
            // getUserConfirmation 如果由外部提供就更好了可以实现自己的弹窗
            // if (typeof getUserConfirmation && typeof getUserConfirmation === 'function') {
            //     return getUserConfirmation(result);
            // } else {
            return getConfirmation(result);
            // }
        } else {
            return result
        }
    }
    // 去到新的页面
    function applyTx(nextAction) {
        action = nextAction;
        [index, location] = getIndexAndLocation();
        // 调用listener 去更新state 从而更新组件
        listeners.call(location, action);
    }

    // POP 造成 对 history 变化的响应，history.go back ......
    window.addEventListener('popstate', () => {
        let nextAction = 'POP'
        let [nextIndex, nextLocation] = getIndexAndLocation();
        if (allowTx(nextAction, nextLocation)) {
            let delta = index - nextIndex;
            if (delta) {
                applyTx(nextAction);
            }
        }
    });

    function push(to, state) {
        // 历史堆栈的管理 pathname: "", search: "", hash: "", state: "" 值 处理
        // TODO: Support forced reloading
        // iOS limits us to 100 pushState calls :/
        // 页面离开确认
        // 更新 state
        let nextAction = 'PUSH';
        let nextLocation = getNextLocation(to, state);

        function retry() {
            push(to, state);
        }
        if (allowTx(nextAction, nextLocation, retry)) {
            let [historyState, url] = getHistoryStateAndUrl(nextLocation, index + 1);
            // TODO: Support forced reloading
            // try...catch because iOS limits us to 100 pushState calls :/
            try {
                globalHistory.pushState(historyState, '', url);
            } catch (error) {
                // They are going to lose state here, but there is no real
                // way to warn them about it since the page will refresh...
                window.location.assign(url);
            }
            applyTx(nextAction);
        }
    }

    function go(n) {
        globalHistory.go(n);
    }

    function goBack() {
        go(-1);
    }

    function goForward() {
        go(1);
    }

    function block() {

    }

    function replace(to, state) {
        let nextAction = 'REPLACE';
        let nextLocation = getNextLocation(to, state);
        function retry() {
            replace(to, state);
        }
        if (allowTx(nextAction, nextLocation, retry)) {
            let [historyState, url] = getHistoryStateAndUrl(nextLocation, index);
            // TODO: Support forced reloading
            globalHistory.replaceState(historyState, '', url);
            applyTx(nextAction);
        }
    }
    var history = {
        get action() {
            return action;
        },
        get location() {
            return location;
        },
        go,
        goBack,
        goForward,
        push,
        replace,
        createHref,
        listen(listener) {
            return listeners.push(listener);
        },
        block(blocker, getUserConfirmation) {
            let unblock = blockers.push(blocker);
            if (blockers.length === 1) {
                window.addEventListener('beforeunload', promptBeforeUnload);
            }
            return function () {
                unblock();
                // Remove the beforeunload listener so the document may
                // still be salvageable in the pagehide event.
                // See https://html.spec.whatwg.org/#unloading-documents
                if (!blockers.length) {
                    window.removeEventListener('beforeunload', promptBeforeUnload);
                }
            };
        }
    }

    return history;
}


// 只是表达URl的形式不同，处理状态过程是相同的。
export function createHashHistory(props) {

    function getIndexAndLocation() {
        let { pathname = '/', hash = '', search = '' } = parsePath(window.location.hash.substr(1))
        let state = globalHistory.state || { idx: null };
        return [state.idx, {
            pathname,
            search,
            hash,
            state: state.usr || null
        }]
    }
    function getNextLocation(to, state = null) {
        return {
            state,
            ...location,
            ...(typeof to === 'string' ? parsePath(to) : to)
        }
    }
    // 当用户浏览会话历史时活动历史条目发生变化时，会触发 Window 界面的 popstate 事件。
    // 当调用 history.pushState()或者history.replaceState()不会触发popstate事件. 
    window.addEventListener('popstate', () => {
        let nextAction = 'POP'
        let [, nextLocation] = getIndexAndLocation();
        if (allowTx(nextAction, nextLocation)) {
            applyTx(nextAction);
        }
    });
    // popstate does not fire on hashchange in IE 11 and old (trident) Edge
    // https://developer.mozilla.org/de/docs/Web/API/Window/popstate_event

    // 当popstate 在活动历史条目变化 有问题时
    window.addEventListener('hashchange', () => {
        let [, nextLocation] = getIndexAndLocation();
        // Ignore extraneous hashchange events.
        if (createPath(nextLocation) !== createPath(location)) {
            let nextAction = 'POP'
            if (allowTx(nextAction, nextLocation)) {
                applyTx(nextAction);
            }
        }
    });

    // window.history 上扩展包装
    var globalHistory = window.history;
    let listeners = createEvents();
    let blockers = createEvents();
    let action = 'POP';
    let [index, location] = getIndexAndLocation();
    // 初始化 历史栈
    if (index == null) {
        index = 0;
        globalHistory.replaceState(Object.assign(Object.assign({}, globalHistory.state), { idx: index }), '');
    }
    // ???
    function getBaseHref() {
        let base = document.querySelector('base');
        let href = '';
        if (base && base.getAttribute('href')) {
            let url = window.location.href;
            let hashIndex = url.indexOf('#');
            href = hashIndex === -1 ? url : url.slice(0, hashIndex);
        }
        return href;
    }
    // 生成URL
    function createHref(to) {
        return getBaseHref() + '#' + (typeof to === 'string' ? to : createPath(to));
    }

    function getHistoryStateAndUrl(nextLocation, index) {
        return [{
            usr: nextLocation.state,
            idx: index
        },
        createHref(nextLocation)
        ];
    }
    // 确认是否离开路由
    function allowTx(action, location, retry) {
        if (!blockers.length) {
            return true;
        }
        let [result] = blockers.call(location, action, retry)
        if (typeof result === 'string') {
            // getUserConfirmation 如果由外部提供就更好了可以实现自己的弹窗
            // if (typeof getUserConfirmation && typeof getUserConfirmation === 'function') {
            //     return getUserConfirmation(result);
            // } else {
            return getConfirmation(result);
            // }
        } else {
            return result
        }
    }
    // 去到新的页面
    function applyTx(nextAction) {
        action = nextAction;
        [index, location] = getIndexAndLocation();
        // 调用listener 去更新state 从而更新组件
        listeners.call(location, action);
    }

    function push(to, state) {
        // 历史堆栈的管理 pathname: "", search: "", hash: "", state: "" 值 处理
        // TODO: Support forced reloading
        // iOS limits us to 100 pushState calls :/
        // 页面离开确认
        // 更新 state
        let nextAction = 'PUSH';
        let nextLocation = getNextLocation(to, state);

        function retry() {
            push(to, state);
        }
        if (allowTx(nextAction, nextLocation, retry)) {
            let [historyState, url] = getHistoryStateAndUrl(nextLocation, index + 1);
            // TODO: Support forced reloading
            // try...catch because iOS limits us to 100 pushState calls :/
            try {
                globalHistory.pushState(historyState, '', url);
            } catch (error) {
                // They are going to lose state here, but there is no real
                // way to warn them about it since the page will refresh...
                window.location.assign(url);
            }
            applyTx(nextAction);
        }
    }

    function go(n) {
        globalHistory.go(n);
    }

    function replace(to, state) {
        let nextAction = 'REPLACE';
        let nextLocation = getNextLocation(to, state);
        function retry() {
            replace(to, state);
        }
        if (allowTx(nextAction, nextLocation, retry)) {
            let [historyState, url] = getHistoryStateAndUrl(nextLocation, index);
            // TODO: Support forced reloading
            globalHistory.replaceState(historyState, '', url);
            applyTx(nextAction);
        }
    }
    var history = {
        get action() {
            return action;
        },
        get location() {
            return location;
        },
        createHref,
        replace,
        push,
        listen(listener) {
            return listeners.push(listener);
        },
        block(blocker, getUserConfirmation) {
            let unblock = blockers.push(blocker);
            if (blockers.length === 1) {
                window.addEventListener('beforeunload', promptBeforeUnload);
            }
            return function () {
                unblock();
                // Remove the beforeunload listener so the document may
                // still be salvageable in the pagehide event.
                // See https://html.spec.whatwg.org/#unloading-documents
                if (!blockers.length) {
                    window.removeEventListener('beforeunload', promptBeforeUnload);
                }
            };
        }
    }

    return history;
}