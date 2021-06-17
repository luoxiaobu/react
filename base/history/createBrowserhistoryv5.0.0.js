// function createEvents<F extends Function>(): Events<F> {
//     let handlers: F[] = [];

//     return {
//       get length() {
//         return handlers.length;
//       },
//       push(fn: F) {
//         handlers.push(fn);
//         return function() {
//           handlers = handlers.filter(handler => handler !== fn);
//         };
//       },
//       call(arg) {
//         handlers.forEach(fn => fn && fn(arg));
//       }
//     };
//   }


export function createBrowserHistory(options = {}) {
    let { window = document.defaultView } = options;
    let globalHistory = window.history;

    function getIndexAndLocation() {
        let { pathname, search, hash } = window.location;
        let state = globalHistory.state || {};
        return [
            state.idx,
            readOnly({
                pathname,
                search,
                hash,
                state: state.usr || null,
                key: state.key || 'default'
            })
        ];
    }
    let blockedPopTx = null;

    function handlePop() {
        if (blockedPopTx) {
            blockers.call(blockedPopTx);
            blockedPopTx = null;
        } else {
            let nextAction = Action.Pop;
            let [nextIndex, nextLocation] = getIndexAndLocation();
            if (blockers.length) {
                if (nextIndex != null) {
                    // delta 的值有意思
                    let delta = index - nextIndex;
                    if (delta) {
                        // Revert the POP
                        blockedPopTx = {
                            action: nextAction,
                            location: nextLocation,
                            retry() {
                                go(delta * -1);
                            }
                        };
                        go(delta);
                    }
                } else {
                    // Trying to POP to a location with no index. We did not create
                    // this location, so we can't effectively block the navigation.
                    warning(false,
                        // TODO: Write up a doc that explains our blocking strategy in
                        // detail and link to it here so people can understand better what
                        // is going on and how to avoid it.
                        `You are trying to block a POP navigation to a location that was not ` +
                        `created by the history library. The block will fail silently in ` +
                        `production, but in general you should do all navigation with the ` +
                        `history library (instead of using window.history.pushState directly) ` +
                        `to avoid this situation.`);
                }
            } else {
                applyTx(nextAction);
            }
        }
    }
    // 对 history 变化的响应，history.go back ......
    window.addEventListener(PopStateEventType, handlePop);
    let action = Action.Pop;
    let [index, location] = getIndexAndLocation();
    let listeners = createEvents();
    let blockers = createEvents();
    if (index == null) {
        index = 0;
        globalHistory.replaceState(Object.assign(Object.assign({}, globalHistory.state), { idx: index }), '');
    }

    function createHref(to) {
        return typeof to === 'string' ? to : createPath(to);
    }

    function getNextLocation(to, state = null) {
        return readOnly(Object.assign(Object.assign(Object.assign({}, location), (typeof to === 'string' ? parsePath(to) : to)), { state, key: createKey() }));
    }

    function getHistoryStateAndUrl(nextLocation, index) {
        return [{
                usr: nextLocation.state,
                key: nextLocation.key,
                idx: index
            },
            createHref(nextLocation)
        ];
    }
    // 确认是否离开路由
    function allowTx(action, location, retry) {
        return (!blockers.length || (blockers.call({ action, location, retry }), false));
    }
    // 去到新的页面
    function applyTx(nextAction) {
        action = nextAction;
        [index, location] = getIndexAndLocation();
        // 调用listener 去更新state 从而更新组件
        listeners.call({ action, location });
    }

    function push(to, state) {
        let nextAction = Action.Push;
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

    function replace(to, state) {
        let nextAction = Action.Replace;
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

    function go(delta) {
        globalHistory.go(delta);
    }
    let history = {
        get action() {
            return action;
        },
        get location() {
            return location;
        },
        createHref,
        push,
        replace,
        go,
        back() {
            go(-1);
        },
        forward() {
            go(1);
        },
        listen(listener) {
            return listeners.push(listener);
        },
        block(blocker) {
            let unblock = blockers.push(blocker);
            if (blockers.length === 1) {
                window.addEventListener(BeforeUnloadEventType, promptBeforeUnload);
            }
            return function() {
                unblock();
                // Remove the beforeunload listener so the document may
                // still be salvageable in the pagehide event.
                // See https://html.spec.whatwg.org/#unloading-documents
                if (!blockers.length) {
                    window.removeEventListener(BeforeUnloadEventType, promptBeforeUnload);
                }
            };
        }
    };
    return history;
}