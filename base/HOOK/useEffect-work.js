//当一个FunctionComponent含有useEffect或useLayoutEffect，他对应的Fiber节点也会被赋值effectTag。

import React from 'react'
import ReactDom from 'react-dom'

/**
 * useEffect 的理解主要有以下两点
 * 1.执行时间
 * 
 * 相对FunctionComponent 的执行 useEffect 执行是异步的，会在dom 渲染后执行
 * 清除 effect的时机 会在 节点被移除 和 effect 函数再次执行前
 * 
 * 2.闭包的理解
 * 
 * 在useEffect 中闭包的理解
 *
 */

function productData(offset, limit) {
    var news = [];
    for (let i = 0; i < limit; i++) {
        news.push({ id: offset + i, title: `我是第${offset + i}新闻`, content: `今日简讯${offset + i}~${offset + i}~${i}` })
    }
    return news
}
const API = {
    async getNews(offset, limit) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (offset >= 10) {
                    console.log(1)
                    reject('e')
                }
                resolve(productData(offset, limit))
            }, 4000)
        })
    }
}
function useNews() {
    const [newsData, setNewsData] = React.useState({ offset: 0, allnews: [] });
    const limit = 5;//默认每页条数
    let { offset, allnews } = newsData
    let [status, setStatus] = React.useState(STATUS.LOADING);
    let getNews = React.useCallback((offset, limit) => {
        setStatus(STATUS.LOADING);
        (async function getNews() {
            let data = await API.getNews(offset, limit);
            if (data && data.length > 0) {
                setNewsData((newsData) => {
                    return {
                        offset: newsData.offset + limit,
                        allnews: [...newsData.allnews, ...data]
                    }
                })
            }
            if (data.length < limit || data.length === 0) {
                setStatus(STATUS.NODATA);
            } else {
                setStatus(STATUS.MOREDATA);
            }
        })().catch((error) => {
            setStatus(STATUS.ERROR)
        });
    }, [])
    React.useEffect(() => {
        getNews(0, limit)
    }, [getNews])
    let showStatus = React.useMemo(() => {
        const show = {
            [LOADING]: <div>数据加载中...</div>,
            [ERROR]: <div><button onClick={() => { getNews(offset, limit) }}>重新加载</button></div >,
            [MOREDATA]: <div><button onClick={() => { getNews(offset, limit) }}>加载更多</button></div >,
            [NODATA]: <div>没有更多数据</div>
        }
        return show[status]
    }, [status, getNews, offset])

    return [allnews,showStatus]
}

const LOADING = 'Loading';
const ERROR = 'Error';
const MOREDATA = 'MoreData';
const NODATA = 'noData';
const STATUS = {
    LOADING,
    ERROR,
    MOREDATA,
    NODATA
}
function APP() {
    console.log('app')
    let [allnews,showStatus] = useNews()
    // const [newsData, setNewsData] = React.useState({ offset: 0, allnews: [] });
    // const limit = 5;//默认每页条数
    // let { offset, allnews } = newsData
    // let [status, setStatus] = React.useState(STATUS.LOADING);
    // let getNews = React.useCallback((offset, limit) => {
    //     setStatus(STATUS.LOADING);
    //     (async function getNews() {
    //         let data = await API.getNews(offset, limit);
    //         if (data && data.length > 0) {
    //             setNewsData((newsData) => {
    //                 return {
    //                     offset: newsData.offset + limit,
    //                     allnews: [...newsData.allnews, ...data]
    //                 }
    //             })
    //         }
    //         if (data.length < limit || data.length === 0) {
    //             setStatus(STATUS.NODATA);
    //         } else {
    //             setStatus(STATUS.MOREDATA);
    //         }
    //     })().catch((error) => {
    //         setStatus(STATUS.ERROR)
    //     });
    // }, [])
    // React.useEffect(() => {
    //     getNews(0, limit)
    // }, [getNews])
    // let showStatus = React.useMemo(() => {
    //     const show = {
    //         [LOADING]: <div>数据加载中...</div>,
    //         [ERROR]: <div><button onClick={() => { getNews(offset, limit) }}>重新加载</button></div >,
    //         [MOREDATA]: <div><button onClick={() => { getNews(offset, limit) }}>加载更多</button></div >,
    //         [NODATA]: <div>没有更多数据</div>
    //     }
    //     return show[status]
    // }, [status, getNews, offset])
    return <div>
        <h3>新闻列表</h3>
        {allnews.length > 0 ? <ul>{
            allnews.map((item, index) => {
                return <li key={item.id}> <div>
                    <h3>{item.title}</h3>
                    <div>{item.content}</div>
                </div></li>
            })}</ul> : null
        }
        {showStatus}
    </div >
}


ReactDom.render(<APP></APP>, document.getElementById('root'))