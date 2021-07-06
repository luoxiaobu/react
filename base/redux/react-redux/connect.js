import React, { useEffect, useState, useContext } from 'react';
import ReactReduxContext from './Context';

import { bindActionCreators } from 'redux';

// export default function connect(mapStateToProps, mapDispatchToProps) {

//     return function (WrappedComponent) {
//         return class extends React.Component {
//             static contextType = ReactReduxContext
//             constructor(props, context) {
//                 super(...arguments);
//                 this.state = mapStateToProps(context.store.getState())
//             }

//             componentDidMount() {
//                 this.unSubscribe = this.context.store.subscribe(() => {
//                     //  // 是一种覆盖拷贝
//                     this.setState(mapStateToProps(this.context.store.getState()))
//                 })
//             }

//             componentWillUnmount() {
//                 this.unSubscribe()
//             }


//             render() {
//                 let boundActions = bindActionCreators(mapDispatchToProps, this.context.store.dispatch)
//                 return <WrappedComponent {...this.state} {...boundActions}></WrappedComponent>
//             }
//         }
//     }
// }



// source code

// export function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
//     return typeof mapDispatchToProps === 'function'
//       ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps')
//       : undefined
//   }

//   export function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
//     return !mapDispatchToProps
//       ? wrapMapToPropsConstant((dispatch) => ({ dispatch }))
//       : undefined
//   }

//   export function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
//     return mapDispatchToProps && typeof mapDispatchToProps === 'object'
//       ? wrapMapToPropsConstant((dispatch) =>
//           bindActionCreators(mapDispatchToProps, dispatch)
//         )
//       : undefined
//   }


// 高阶组件，订阅，取消订阅
export default function (mapStateToProps, mapDispatchToProps) {
    return function (WrappedComponent) {
        return function (props) {
            let { store } = useContext(ReactReduxContext);
            let { getState, dispatch, subscribe } = store;
            let preState = getState();
            // 返回当前组件需要的 state
            let stateProps = mapStateToProps(preState);
            let dispatchProps;
            //此处源码做了包裹
            if (typeof mapDispatchToProps === 'function') {
                // mapDispatchToProps起到的作用 同 bindActionCreators
                dispatchProps = mapDispatchToProps(dispatch);
            } else if (typeof mapDispatchToProps === 'object') {
                dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
            } else {
                // 将dispatch 透传
                dispatchProps = { dispatch }
            }
            // 订阅， 取消订阅, 当 setState 被调用时 触发函数重新执行
            // subscribe 返回的函数被执行时 取消订阅
            // 源码过程 值得思考
            let [, setState] = useState(0);
            useEffect(() => subscribe(() => setState(x => x + 1)), [subscribe])
            return (<WrappedComponent {...props} {...dispatchProps} {...stateProps}></WrappedComponent>)
        }
    }
}
