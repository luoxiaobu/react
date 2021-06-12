import pathToRegexp from 'path-to-regexp';
/**
 *
 * options 
 * sensitive： When true the regexp will be case sensitive. (default: false)
 * strict： When true the regexp won't allow an optional trailing delimiter to match. (default: false)
 * end： When true the regexp will match to the end of the string. (default: true)
 */


//source code 有一个缓存机制，值得学习~


//  const cache = {};
//  const cacheLimit = 10000;
//  let cacheCount = 0;

//  function compilePath(path, options) {
//    const cacheKey = `${options.end}${options.strict}${options.sensitive}`;
//    const pathCache = cache[cacheKey] || (cache[cacheKey] = {});

//    if (pathCache[path]) return pathCache[path];

//    const keys = [];
//    const regexp = pathToRegexp(path, keys, options);
//    const result = { regexp, keys };

//    if (cacheCount < cacheLimit) {
//      pathCache[path] = result;
//      cacheCount++;
//    }

//    return result;
//  }


function compilePath(path, options) {
    const keys = [];
    const regexp = pathToRegexp(path, keys, options);
    return { regexp, keys };
}

function matchPath(pathname, options = {}) {
    if (typeof options === "string" || Array.isArray(options)) {
        options = { path: options };
    }
    const { path, exact = false, strict = false, sensitive = false } = options;
    var paths = [].concat(path)
    return paths.reduce((matched, path) => {
        if (!path && path !== "") return null;
        if (matched) return matched;
        // key params name
        const { regexp, keys } = compilePath(path, {
            end: exact,
            strict,
            sensitive
        });
        // 返回一个数组时的结构：包括第一个完整匹配的字符串和相关的捕获组，index，input 属性。
        const match = regexp.exec(pathname);
        if (!match) return null;
        const [url, ...values] = match
        const isExact = pathname === url;
        // 匹配到结尾
        // /^\/home(?:\/(?=$))?$/i 正则会多一个斜杠，  但此处是要求完全匹配
        if (exact && !isExact) return null;

        return {
            path,
            url,
            isExact,
            params: keys.reduce((memo, key, index) => {
                memo[key.name] = values[index]
                return memo;
            }, {})
        };
    }, null)
}

export default matchPath;