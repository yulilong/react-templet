import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import rootRoutes from './views/appRoutes';
// require("./style/base.css")

ReactDOM.render(
  <Router
    history={hashHistory}
    routes={rootRoutes}
  />,
  document.getElementById('app'),
);
