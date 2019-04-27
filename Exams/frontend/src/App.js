import React, {Component} from 'react';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'

import './App.css';
import rootReducer from './reducers'
import Song from "./components/song"

export const store = createStore(rootReducer, applyMiddleware(logger, thunk))

export default class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Song />
            </Provider>
        );
    }
}

 
