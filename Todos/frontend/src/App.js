import React from 'react';
import './App.css';

import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

//import { numberReducer } from './Reducers/Counter'
//import { bearReducer } from './Reducers/Bears'
import {todoReducer} from './Reducers/Todos'
//import Count from './Component/Count'
//import Bear from './Component/Bear'
import Todo from './Component/Todo'

export const rootReducer = combineReducers({ todos: todoReducer })
export const store = createStore(rootReducer, applyMiddleware(logger, thunk))



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <br />
        <h1>Countries CRUD </h1>
        <br />
      </header>

      <Provider store={store}>

        <br />
        <div class="card container">
          <div class="card-body">
            <Todo />
          </div>
        </div>

        <br />
       
       
      </Provider>

      <header className="App-header">
        <br />
        <h3>Developer</h3>
        <h5>Name: Mr.Jatupat Pannoi</h5>
        <h5>ID : 5735512002</h5>
        <h5>Section : 02</h5>
        <br />
      </header>

    </div>
  );
}

export default App;
