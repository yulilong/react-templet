[TOC]



# react中使用redux的说明

本说明文档主要介绍在react中使用redux，以及使用方法介绍，看完后可删除此文档。



## 1. 安装对应依赖包

```json
"react-redux": "^6.0.0",
"redux": "^4.0.1",
"redux-actions": "^2.6.4",
"redux-logger": "^3.0.6",
"redux-promise": "^0.6.0",
"redux-thunk": "^2.3.0",
```

注意：

1、上面的包对应的react版本是`16.4.1`，如果react版本又变动，请修改对应版本。

2、redux里面可以处理异步函数，比如请求API。

3、`redux-logger`：用于在浏览器终端输出redux的信息。

4、`redux-promise`:当中间接收到的是一个Promise实例，会dispatch掉resoved的值，对于reject的结果并不做任何处理，详情：https://www.jianshu.com/p/759a3b7b9a3f

5、`redux-thunk`:可以让我们`dispatch`一个函数，而不只是普通的 Object，详情：https://zhuanlan.zhihu.com/p/85403048

## 2. 添加store文件，添加redux代码的文件夹model

在`src`文件夹下添加`store.js`文件，这个文件会自动处理所有redux代码，并添加了支持异步处理。具体代码请查看store文件。

`store.js`文件会自动读取`src/model`文件夹下的文件，`src/model`文件夹里面一个文件就是一个redux。文件名就是reducers的名字，也可以在文件里面使用`name`属性指定名字。

注意，`src/model`至少要有一个文件，否则浏览器终端会提示报错(不影响程序运行)：

```
Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.
```

model文件夹里面一个文件例子：

```js
// 文件名字：demo.js
/**
 * 功能: 一个redux文件示例
 * 这个文件会被src/store.js文件进行处理
 */
export default {
  // name: 'demo', // 通过这个指定reducers名字
  state: {
    userName: '未获取',
    asyncName: '未执行',
  },
  action: {
    setUserName(params) { return params; },
    getAsyncName(params) {
      return new Promise((resolve, reject) => {
        setTimeout(() => { resolve('异步获取的值'); }, 3000);
      });
    },
  },
  reducer: {
    /**
     * 设置按钮类型
     * @param  {object} state   上面的state
     * @param  {object} action   设置的数据{type: "firstCard/setButtonType", payload: "12333333"}
     * @param  {object} error   异步请求的报错信息，同步信息此值是undefined
     */
    setUserName(state, action) {
      const data = action.payload;
      return { ...state, userName: data, };
    },
    // 一个异步例子
    getAsyncName(state, action, error) {
      const data = action.payload;
      if (!error) {
        return {
          ...state,
          asyncName: data,
        };
      }
      return { ...state };
    },
  },
};
```



## 3. 修改src/index.jsx文件，添加redux到程序

上面的添加好后，还需要修改根JS文件，把redux添加到程序中，打开`src/index.jsx`文件，修改如下：

```jsx
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
// redux 的 store文件
import store from './store';
import rootRoutes from './views/appRoutes';

// 之前的写法
// ReactDOM.render(
//   <Router history={hashHistory} routes={rootRoutes} />,
//   document.getElementById('app'),
// );

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} routes={rootRoutes} />
  </Provider>
  ,
  document.getElementById('app'),
);
```

## 4. 组件中使用

简单使用：

```jsx
import React from 'react';
import { connect } from 'react-redux';
// 这是设置了import别名，如果没有请使用相对路径
import demoRedux from '@model/demo';

class Home extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    // 设置属性
    dispatch(demoRedux.setUserName('jack'));
    dispatch(demoRedux.getAsyncName(true));
  }

  render() {
    const { demo } = this.props;
    console.log('demo: ', demo); // 通过demo.userName调用属性
    return (
      <div className="home"> 123 </div>
    );
  }
}
export default connect(s => s)(Home);
```



复杂使用:

```jsx
import React from 'react';
import { connect } from 'react-redux';
import demoRedux from '@model/demo';

class Home extends React.Component {
  componentDidMount() {
    const { setUserName, getAsyncName } = this.props;
    setUserName('jack');
    getAsyncName(true);
  }

  render() {
    const { asyncName } = this.props;
    console.log('asyncName: ', asyncName);
    return (
      <div className="home"> 123 </div>
    );
  }
}

// 这种方法适用于方法少的，如果方法很多，建议使用上面的
const mapDispatchToProps = (dispatch) => {
  const {
    setUserName, getAsyncName,
  } = demoRedux;
  return {
    setUserName: param => dispatch(setUserName(param)),
    getAsyncName: param => dispatch(getAsyncName(param)),
    dispatch,
  };
};

export default connect(
  ({ demo }) => ({ ...demo }),
  mapDispatchToProps,
)(Home);
```


