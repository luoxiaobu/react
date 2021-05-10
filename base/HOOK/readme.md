Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数
关于hook 源码：
Hook的工作流程分为声明阶段和调用阶段
// useState
区分第一次执行，和非第一次执行
第一次执行mount 阶段会初始化链表 
非第一次执行update
hook->hook->hook : 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。 为了保持顺序


queue.pending = update  ---> update---> update // 性能优化 批处理
```js 
const update = {
  // 更新执行的函数
  action,
  // 与同一个Hook的其他更新形成链表，性能优化 批处理
  next: null
}

```

结构：

hook{ queue.pending = update  ---> update---> update  }
  |             ^                        |
  |             |                        |
  |             --------------------------
  
hook{ queue.pending = update  ---> update---> update  }
                ^                        |
                |                        |
                --------------------------

对于当前reactElement 对应一个 FiberNode

```js 
{
//保存该FunctionComponent对应的Hooks链表
this.memoizedState = null;
// 对于 FunctionComponent，指函数本身，对于ClassComponent，指class，// 对于HostComponent，指DOM节点tagName
this.type = null;
// Fiber对应的真实DOM节点
this.stateNode = null;
}

```