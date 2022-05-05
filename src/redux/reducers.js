import { combineReducers } from 'redux';
import auth from './auth/reducer';
import todos from './todos/reducer';

export default combineReducers({
    todos,
    auth
})