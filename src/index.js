import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';

import TodoApp from "./todoApp/todoApp";
import configureStore from './todoApp/configureStore';

const store = configureStore();
    
ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>, 
  document.getElementById("app"));