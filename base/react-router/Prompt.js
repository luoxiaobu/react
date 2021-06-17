import React from 'react';

import Lifecycle from './Lifecycle';
import RouterContext from './RouterContext';
// 有一种包装一层做一个逻辑的感觉
function Prompt({ message, when = true }) {

    return (<RouterContext.Consumer>
        {
            context => {
                //if (!when || context.staticContext) return null;
                if (!when) return null
                const method = context.history.block;
                return <Lifecycle
                    onMount={
                        // self 指代lifecycle
                        self => {
                            // self.release 取消阻塞函数
                            self.release = method(message);
                        }
                    } onUpdate={
                        (self, prevProps) => {
                            // self.release 取消阻塞函数
                            if (prevProps.message !== message) {
                                // self.release 取消阻塞函数
                                self.release()
                                // 重新注册
                                self.release = method(message);
                            }

                        }
                    } onUnmount={self => {
                        console.log('1')
                        self.release()
                    }} message={message}></Lifecycle>
            }
        }
    </RouterContext.Consumer>)

}

export default Prompt
