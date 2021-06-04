import pathToRegexp from 'path-to-regexp';
/**
 *
 * options 
 * sensitive： When true the regexp will be case sensitive. (default: false)
 * strict： When true the regexp won't allow an optional trailing delimiter to match. (default: false)
 * end： When true the regexp will match to the end of the string. (default: true)
 */

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
    const { regexp, keys } = compilePath(path, {
        end: exact,
        strict,
        sensitive
    });
}

export default matchPath;