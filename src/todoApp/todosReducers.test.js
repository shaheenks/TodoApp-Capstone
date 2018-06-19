const deepFreeze = require('deep-freeze-strict');

const {todos, visibilityFilter} = require('./todosReducers');

const testAddTodo = () => {
    let stateBefore = [];
    let stateAfter = [{
        id: 0,
        text: 'Learn',
        completed: false
    }];
    let action = {
        id: 0,
        type: 'ADD_TODO',
        text: 'Learn',
        completed: false
    };

    deepFreeze(stateBefore);

    expect(todos(stateBefore, action)).toEqual(stateAfter);
};

const testToggleTodo = () => {
    let stateBefore = [{
        id: 0,
        text: 'Learn',
        completed: true
    }];
    let stateAfter = [{
        id: 0,
        text: 'Learn',
        completed: false
    }];
    let action = {
        id: 0,
        type: 'TOGGLE_TODO'
    };

    deepFreeze(stateBefore);

    expect(todos(stateBefore, action)).toEqual(stateAfter);
};

const testRemoveTodo = () => {
    let stateBefore = [{
        id: 0,
        text: 'Learn',
        completed: true
    }];
    let stateAfter = [];
    let action = {
        id: 0,
        type: 'REMOVE_TODO'
    };

    deepFreeze(stateBefore);

    expect(todos(stateBefore, action)).toEqual(stateAfter);
};

const testUnknownAction = () => {
    let stateBefore = [{
        id: 0,
        text: 'Learn',
        completed: true
    }];
    let stateAfter = [{
        id: 0,
        text: 'Learn',
        completed: true
    }];
    let action = {
        id: 0,
        type: 'UNKNOWN_TODO'
    };

    deepFreeze(stateBefore);

    expect(todos(stateBefore, action)).toEqual(stateAfter);
};

const setCompletedFilter = () => {
    let stateBefore = 'SHOW_ALL';
    let action = {
        filter: 'SHOW_COMPLETED',
        type: 'SET_VISIBILITY_FILTER'
    };
    let stateAfter = 'SHOW_COMPLETED'

    deepFreeze(stateBefore);

    expect(visibilityFilter(stateBefore, action)).toEqual(stateAfter);
}

const setActiveFilter = () => {
    let stateBefore = 'SHOW_COMPLETED';
    let action = {
        filter: 'SHOW_ACTIVE',
        type: 'SET_VISIBILITY_FILTER'
    };
    let stateAfter = 'SHOW_ACTIVE'

    deepFreeze(stateBefore);

    expect(visibilityFilter(stateBefore, action)).toEqual(stateAfter);
};

const setBlankFilter = () => {
    let stateBefore = 'SHOW_ALL';
    let action = {
        type: 'UNKNOWN'
    };
    let stateAfter = 'SHOW_ALL'

    deepFreeze(stateBefore);

    expect(visibilityFilter(stateBefore, action)).toEqual(stateAfter);
};

test('Todos Reducer - Adding Todo item.', testAddTodo);
test('Tods Reducer - Toggle Todo item.', testToggleTodo);
test('Todos Reducer - Remove Todo item.', testRemoveTodo);
test('Todos Reducer - Unknown action.', testAddTodo);

test('visbilityFilter Reducer - Set Completed.', setCompletedFilter);
test('visbilityFilter Reducer - Set Active.', setActiveFilter);
test('visbilityFilter Reducer - Blank Action.', setBlankFilter);



