import React from 'react';

let ReactReduxContext = React.createContext(null);

// 开发环境 方便调试
// if (process.env.NODE_ENV !== 'production') {
//   ReactReduxContext.displayName = 'ReactRedux'
// }

export default ReactReduxContext;