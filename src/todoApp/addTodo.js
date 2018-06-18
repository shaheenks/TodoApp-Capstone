import React from 'react';
import {connect} from 'react-redux'
import ReactDOM from "react-dom";
import {v4} from 'uuid';

const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: v4(),
    text
});

let AddTodo = ({dispatch}) => {
  let input;
  return (
    <div>
      <input ref={node => input = node} />
      <button onClick={()=>{
        dispatch(addTodo(input.value));
        input.value='';
      }}>Add</button>
    </div>
  )
};

export default connect()(AddTodo);