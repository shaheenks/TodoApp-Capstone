import axios from 'axios';

const updateDynamoDB = (state) => {
    try {
        var key = localStorage.getItem('sessionKey');
        axios.post('/updatetodos', {username: key, todos: state.todos})
        .then((response) => {
            console.log('Saved');
        }).catch((e) => console.log(e))
    } catch (e) {
        console.log('Error Updating DynamoDB.')
    }
};

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
        updateDynamoDB(state)
    } catch (err) {
        console.log('Saving state failed.')
    }
}

export const loadSessionKey = () => {
    try {
        const key = localStorage.getItem('sessionKey');
        if (key === null) {
            return undefined;
        }
        return key;
    } catch (err) {
        return undefined;
    }
}

export const saveSessionKey = (key) => {
    try {
        localStorage.setItem('sessionKey', key);
        return true;
    } catch (err) {
        console.log('Saving state failed.')
        return false;
    }
}

export const removeSession = () => {
    try {
        localStorage.clear();
        return true;
    } catch (err) {
        console.log('Clearing Failed')
        return false;
    }
};