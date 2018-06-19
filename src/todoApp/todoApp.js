import React from "react";

import NavBar from './navBar.jsx';
import AddTodo from './addTodo';
import VisibleTodoList from './todoList';
import Footer from './footer';
import LoginPage from './loginPage.jsx'

const TodoApp = () => (
    <div className="container">
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
);

export default TodoApp;

