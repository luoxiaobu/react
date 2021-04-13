// 关于 ref ， React.createRef(),React.forwardRef()


//普通元素的ref挂载的是dom的引用
import React from './react'
import ReactDOM from './react-dom'



class Count extends React.Component {
    constructor(props) {
        super(props);
        this.a = React.createRef();
        this.b = React.createRef();
        this.result = React.createRef();
    }

    add = () => {
        this.result.current.value = (this.a.current.value + this.b.current.value) || 0;
    }

    render() {
        // 都是在传递React.createRef()创建的对象的引用,
        // 将组件实例或者普通元素挂在对象上current属性上
        return (<div>
            <input ref={this.a}/> + <input ref={this.b} /> <button onClick={this.add}>= </button> <input ref={this.result} />
</div>
        )
    }
}
let count = < Count > </Count>
    //转换成一个object 对象
ReactDOM.render(count, document.getElementById('root'))