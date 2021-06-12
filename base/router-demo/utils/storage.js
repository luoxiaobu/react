const prefixKey = 'react-demo_'
const _storageAvailable = (function() {
    try {
        var storage = window.localStorage;
        var x = '__storage_test__'
        storage.setItem(x, x)
        storage.removeItem(x)
        return true
    } catch (e) {
        return false
    }
})()


function serialize(val) {
    return JSON.stringify(val)
}

function deserialize(val) {
    if (typeof val !== 'string') {
        return undefined
    }
    try {
        return JSON.parse(val)
    } catch (e) {
        return val || undefined
    }
}

function getprefixKey(key) {
    return prefixKey + key
}

export function setItem(key, item) {
    if (!key || !item || !_storageAvailable) {
        return
    }

    localStorage.setItem(getprefixKey(key), serialize(item))
    return item
}

export function getItem(key, def) {
    if (!key || !_storageAvailable) {
        return def
    }
    let val = deserialize(localStorage.getItem(getprefixKey(key)))
    return (val === undefined ? def : val)
}

export function removeItem(key) {
    if (key && _storageAvailable) {
        localStorage.removeItem(getprefixKey(key))
    }
}

export function clear() {
    if (!_storageAvailable) {
        return
    }
    var ret = []
    for (var i = 0; i < localStorage.length; i++) {
        ret.push(localStorage.key(i))
    }
    ret.forEach(key => {
        if (key.indexOf(prefixKey, 0) === 0) {
            localStorage.removeItem(key)
        }
    })
}