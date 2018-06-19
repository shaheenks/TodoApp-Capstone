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
    <div className="input-group mb-3">
    <div>
      <input className="form-control" type="text" placeholder="I want to ...." ref={node => input = node} />
    </div>
    <div className="input-group-append">
      <span className="input-group-text" onClick={()=>{
        dispatch(addTodo(input.value));
        input.value='';
      }}>Add</span>
    </div>
    </div>
  )
};

export default connect()(AddTodo);