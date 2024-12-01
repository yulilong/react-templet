import 'babel-polyfill';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
// redux 的 store文件
import store from './store';
import rootRoutes from './views/appRoutes';
// require("./style/base.css")

// ReactDOM.render(
//   <Router
//     history={hashHistory}
//     routes={rootRoutes}
//   />,
//   document.getElementById('app'),
// );
createRoot(document.getElementById('app'))
  .render(
    <Provider store={store}>
      <Router
        history={hashHistory}
        routes={rootRoutes}
      />
    </Provider>
  );
