import React, { Component } from 'react'

import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'

import './App.css';
import Switchs from './Component/Switchs'
import SwitchReducer from './Reducer'

export const rootReducer = combineReducers({ switchs: SwitchReducer })
export const store = createStore(rootReducer, applyMiddleware(logger, thunk))

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <br /><h1>CRUD Switch ReactApp</h1> <br />
        </header>
        <Provider store={store}>
          <Switchs />
        </Provider>



      </div>
    );
  }

}



