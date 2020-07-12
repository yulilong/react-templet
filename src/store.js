/**
 * 功能: store封装
 * 作者: 
 * 日期: 2020-06-25
 */

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createActions, handleActions } from 'redux-actions';

const getAction = (action, name) =>
  createActions({
    [name]: action,
  });

const getReducer = (reducer, name) =>
  Object.keys(reducer || {})
    .reduce((reducers, key) => {
      reducers[`${name}/${key}`] = reducer[key];
      return reducers;
    }, {});


const reducers = {};

const add = (model) => {
  const {
    name,
    state,
  } = model;
  let {
    action,
    reducer,
  } = model;

  action = getAction(action, name);
  reducer = getReducer(reducer, name);

  reducers[name] = handleActions(reducer, state);

  delete model.action;
  delete model.state;
  delete model.reducer;

  Object.assign(model, action[name]);
};

const context = require.context('./model/', false, /\.js$/);
const files = context.keys();

files.forEach((file) => {
  const model = context(file).default;
  if (!model.name) {
    model.name = file.replace(/^.+[/\\]([^.]+)\.js$/, '$1');
  }

  add(model);
});

const middlewares = [thunk, promise];

// 开发环境添加 redux-logger 日志
// if (process.env.NODE_ENV !== 'production') {
//   middlewares.push(require('redux-logger').default);
// }

// 不用Chrome插件Redux DevTools时，用这个
// const store = createStore(
//   combineReducers(reducers),
//   applyMiddleware(...middlewares),
// );

// Chrome浏览器插件Redux DevTools的支持
// https://github.com/zalmoxisus/redux-devtools-extension#usage
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers(reducers),
  composeEnhancers(applyMiddleware(...middlewares)),
);

export default store;
