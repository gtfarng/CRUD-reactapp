import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import StudentReducer from './student/reducer';
import InputReducer from './input/reducer';

const reducers = combineReducers({
    Student: StudentReducer,
    Input: InputReducer
})

export default createStore(reducers, applyMiddleware(thunk));