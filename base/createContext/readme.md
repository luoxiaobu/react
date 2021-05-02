```js
function createContext() {
    // 注释部分是伪代码 方便理解
    // function Consumer(props) {
    //     return props.children(Provider._value)
    // }

    // function Provider(props) {
    //     Provider._value = props.value
    //     return props.children
    // }
    // return {
    //     Consumer,
    //     Provider
    // }
    
    类似于构建了一个闭包存储值  需要时就从里面取出来
    const context = {
        type: 'REACT_CONTEXT_TYPE',
        Provider: null,
        Consumer: null,
        _value: null
    };

    context.Provider = {
        type: 'REACT_PROVIDER_TYPE',
        _context: context
    };
    //
    context.Consumer = context;
    return context
}
```

let ThemeContext = React.createContext();
<ThemeContext.Provider value={...}> 这一句就是在给ThemeContext 赋值
方便后续取值
```js
return (<ThemeContext.Provider value={...}>
            <Header menu={this.menu}></Header>
            <Main></Main>
            <Content2></Content2>
            <Footer></Footer>
        </ThemeContext.Provider>)
```

对于类组件：
static contextType = ThemeContext;
就可以取出ThemeContex 中的值来用了

对于函数组件：
```js
        <ThemeContext.Consumer>
            {props =>(<div style={{ height: '100px', color: props.background}}>
                内容2
            </div>)}
        </ThemeContext.Consumer>
```
ThemeContext.Consumer 这个对象节点的操作就是取出 ThemeContext中的值当props 传递个渲染模块
