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

const appRoutes = (
  <Route key="root" path="/" component={App}>
    {/* 默认打开就是home */}
    <IndexRoute component={Home} />
    <Route key="home" path="home" component={Home} />
  </Route>
);

export default appRoutes;