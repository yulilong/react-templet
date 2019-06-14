import React from 'react'
import { Route, IndexRoute }  from 'react-router'
import Home   from './home/Home'                                // 页面首页组件
require('./app.less')



class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount () {
  }
  
  render () {
    return (
      <div className="layout">
        <div className="header" id="header">
          我是头部
        </div>
        <div className="content">
          {this.props.children}
        </div>
        <div className="footer">
          我是脚部
        </div>
      </div>
    );
  }
}

/**
 * 页面打开后，默认进入一个页面有两种方式：
 * 直接进入一个组件中：<IndexRoute component={Home} />，这种方式页面链接是首页的链接不变
 * 另一种是链接重定向，直接指向最终页面： <IndexRoute onEnter= { (nextState, replace) => replace('/home') }/>
 * 这种方式是直接重定向链接了，直接定位到目标组件，比较好
 */
const appRoutes = (
  <Route key="root" path="/" component={App}>
    {/* 默认打开就是home */}
    {/* <IndexRoute component={Home} /> */}
    {/* 默认打开'/home'链接 */}
    <IndexRoute onEnter= { (nextState, replace) => replace('/home') }/>
    <Route key="home" path="home" component={Home} />
  </Route>
);

export default appRoutes;