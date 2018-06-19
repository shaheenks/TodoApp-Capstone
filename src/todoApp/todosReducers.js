import { combineReducers } from 'redux';
import filter from 'lodash/filter';

const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {id: action.id, text: action.text, completed: false};
        case 'TOGGLE_TODO':
            if (state.id == action.id) {
                return {...state, completed: !state.completed}
            }
            else {
                return state;
            }
        default:
            return state;
    }
};

const todos = (state=[], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'REMOVE_TODO':
            return filter(state, (o) => action.id != o.id)
        case 'TOGGLE_TODO':
            return state.map((item) => todo(item, action))
        default:
            return state;
    }
};

const visibilityFilter = (
    state='SHOW_ALL', 
    action
) => {
    switch (action.type){
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

const todoApp = combineReducers({
    todos,
    visibilityFilter
});

module.exports = {
    todoAppStore: todoApp,
    todos,
    visibilityFilter
};