// 核心库 预渲染平台无关 将模板变成一个对象 vodm {props,type,ref}
import React from './react';

// 渲染库 可以把react 渲染到不同平台上 react-dom react-canvas react-native
import ReactDom from './react-dom';

// Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法
// 地区偏好，UI 主题 
let ThemeContext = React.createContext();

const LIGHT = 'light'
const DARK = 'dark'
// ThemeContent = {Provider, Consumer}

//函数组件
function Content2(props) {

    return (
        <ThemeContext.Consumer>
            {props => (<div style={{ height: '100px', color: props.background }}>
                内容2
            </div>)}
        </ThemeContext.Consumer>
    )
}

//类组件
class Menu extends React.Component {
    static contextType = ThemeContext;
    render() {
        return (<ul style={{ display: 'flex', borderColor: this.context.background, borderWidth: '10px' }}>{
            this.props.menu ? this.props.menu.map((item) => {
                return <li key={item} style={{ flex: '1', 'color': this.context.background }}>{item}</li>
            }) : null
        } </ul>)
    }
}

class Bar extends React.Component {
    static contextType = ThemeContext;
    render() {
        return (<div style={{ height: '5px', marginTop: '3px', backgroundColor: this.context.background }}></div>)
    }
}

class Header extends React.Component {
    render() {
        return (<div>
            <Menu {...this.props}></Menu>
            <Bar></Bar>
        </div>)
    }
}

class Main extends React.Component {
    static contextType = ThemeContext;
    render() {
        return (<div style={{ height: '100px', color: this.context.background }}>
            内容
        </div>)
    }
}

class Footer extends React.Component {
    static contextType = ThemeContext;
    render() {
        return (<div style={{ position: 'relative', height: '100px', color: this.context.background, borderWidth: '10px' }}>
            版权:2020-2021
            <div style={{ position: 'absolute', bottom: '20px' }}>
                <div>改变主题</div>
                <div>
                    <button style={{ color: this.context.background, backgroundColor: 'white' }} onClick={() => this.context.changeColor(LIGHT)}>{LIGHT}</button>
                    <button style={{ color: this.context.background, backgroundColor: 'white' }} onClick={() => this.context.changeColor(DARK)}>{DARK}</button>
                </div>
            </div>
        </div>)
    }
}


class APP extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: LIGHT };
        this.menu = ['教育', '体育', '娱乐'];
        this.a = React.createRef()
    }
    changeColor = (value) => {
        this.setState({ value });
    }
    componentDidMount() {
        console.log(this.a)
    }
    render() {
        const themes = {
            [LIGHT]: {
                background: '#eeeeee',
                changeColor: this.changeColor
            },
            [DARK]: {
                background: '#222222',
                changeColor: this.changeColor
            },
        };
        return (<ThemeContext.Provider value={themes[this.state.value]}>
            <Header menu={this.menu}></Header>
            <Main></Main>
            <Content2></Content2>
            <Footer></Footer>
        </ThemeContext.Provider>)
    }
}
ReactDom.render(<APP />, document.getElementById('root'))