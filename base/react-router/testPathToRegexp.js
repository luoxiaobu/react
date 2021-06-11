let pathToRegexp = require('path-to-regexp');
// about  end (default: false)
// let regexp = pathToRegexp('/home', [], { end: false });
// /^\/home(?:\/(?=$))?(?=\/|$)/i
// 以什么开头
// // 匹配/home，/home/ 和 /home/+任何

//--------------------------------
let regexp = pathToRegexp('/home', [], { end: true });
// 匹配/home，/home/ 匹配到结尾的位置
// /^\/home(?:\/(?=$))?$/i
console.log(regexp.test('/home/'));
console.log(regexp);

// let params = [];
// let regexp = pathToRegexp('/users/:id/:name', params, { end: true });

// let result = '/users/ic123/haha'.match(regexp);
// [
//     '/users/ic123/haha',
//     'ic123',
//     'haha',
//     index: 0,
//     input: '/users/ic123/haha',
//     groups: undefined
//   ]
// console.log(result);
// console.log(regexp);
// /^\/users\/((?:[^\/]+?))\/((?:[^\/]+?))(?:\/(?=$))?$/i {
//     keys: [
//       {
//         name: 'id',
//         prefix: '/',
//         delimiter: '/',
//         optional: false,
//         repeat: false,
//         partial: false,
//         asterisk: false,
//         pattern: '[^\\/]+?'
//       },
//       {
//         name: 'name',
//         prefix: '/',
//         delimiter: '/',
//         optional: false,
//         repeat: false,
//         partial: false,
//         asterisk: false,
//         pattern: '[^\\/]+?'
//       }
//     ]
//   }




// about  strict (default: false)
// 当为 true 时，regexp 将不允许可选的尾随定界符匹配
// let regexp = pathToRegexp('/home', [], { strict: true });

// // /^\/home$/i
// // 匹配/home

// console.log(regexp.test('/home/'));
// console.log(regexp);


// let params = [];
// let regexp = pathToRegexp('/users/:id/:name', params, { strict: true });
// //  /^\/users\/((?:[^\/]+?))\/((?:[^\/]+?))$/i

// let result = regexp.test('/users/ic123/haha')

// console.log(regexp);
// console.log(result);