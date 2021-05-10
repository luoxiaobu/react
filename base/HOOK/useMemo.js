// 返回一个 memoized 值。
//你可以把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证。
let value = useMemo(() => computeExpensiveValue(a, b), [a, b]);
let hook = [];
let hookIndex = 0; //代表当前的hooks的索引
function useMemo(factory, deps) {
    if (hookStates[hookIndex]) {
        let [memo, lastDeps] = hookStates[hookIndex]
        let same = lastDeps.every((item, index) => item === lastDeps[index])
        if (same) {
            hookIndex++
            return memo
        }
    }
    let newMemo = factory();
    hookStates[hookIndex++] = [newMemo, deps]
    return newMemo
}