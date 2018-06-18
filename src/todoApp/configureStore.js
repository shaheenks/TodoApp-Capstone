 import { todoAppStore } from './todosReducers';
 import { loadState, saveState } from './localStorage';
 import { createStore } from 'redux';
 import { throttle } from 'lodash/throttle';
 
 const configureStore = () => {
    var persistedState = loadState();
    const store = createStore(todoAppStore, persistedState);
    // Add Throttle Function.
    store.subscribe(() => {
        saveState({
            todos: store.getState().todos
        })
    })
    return store;
 };

 export default configureStore;