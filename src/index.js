import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import axios from 'axios';

import TodoApp from "./todoApp/todoApp";
import configureStore from './todoApp/configureStore';
import NavBar from './todoApp/navBar.jsx';
import LoginPage from "./todoApp/loginPage.jsx";

import 'bootstrap/dist/css/bootstrap.min.css';
import { loadSessionKey, saveSessionKey, removeSession, saveState } from "./todoApp/localStorage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {key: loadSessionKey(), failed: false};
    
    this.onSubmit = this.onSubmit.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
  }
  checkSessionKey() {
    if (this.state.key) return true 
    else false;
  }
  onSubmit(username, password) {
    axios.post('/login', {username, password}).then((response) => {
      this.setState({key: response.data.username});
      saveSessionKey(response.data.username);
      saveState({todos: response.data.todos});
      window.location.reload();
    }).catch((e) => {
      this.setState({failed: true})
      console.log(e)
    })
  }
  onLogOut() {
    this.setState({key: undefined, failed: false});
    removeSession();
  }
  render() {
    return (
      <div className="container">
      <NavBar logOutButton={this.state.key ? true : false} logOut={this.onLogOut}/>
      {this.checkSessionKey() ? 
      <Provider store={configureStore()}>
        <TodoApp />
      </Provider> : <LoginPage onSubmit={this.onSubmit} failed={this.state.failed}/>}
      </div>
    )
  }
}
    
ReactDOM.render(
  <App />
  , 
  document.getElementById("app"));