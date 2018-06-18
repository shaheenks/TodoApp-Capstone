import React from 'react';
import {connect} from 'react-redux';

const getVisibleTodos = (todos, filter) => {
    switch (filter){
      case 'SHOW_ALL':
        return todos;
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed)
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed)
      default:
        return todos;
    }
  };

const Todo = ({
    onClick,
    completed,
    text
  }) => {
    return (
      <li
        onClick={onClick}
        style={{textDecoration: completed ? 'line-through' : 'none'}}>
      {text}
      </li>
    )
  };

const TodoList = ({
    todos,
    onTodoClick
  }) => {
    return (
      <ul>
        {todos.map(todo => <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />)}
      </ul>
    )
  };

const mapStateToProps = (state) => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
});
const mapDispatchToProps = (dispatch) => ({
    onTodoClick(id) {
      dispatch({type: 'TOGGLE_TODO', id})
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);