import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Student from './Student';
import Input from './Input'
import './App.css'

class App extends React.Component {
  state = {
    students: []
  }

  render() {
    return (
      <Provider store={store}>
    
      <header className="App-header" >
      <br/>
      <h1>CRUD STUDENTS</h1>
       <br/>
      </header>

        <Input/>
         <Student/>
        
    <br />

      <header className="App-header">
        <br />
        <h3>Developer</h3>
        <h5>Name: Mr.Jatupat Pannoi</h5>
        <h5>ID : 5735512002</h5>
        <h5>Section : 02</h5>
        <br />
      </header>
         </Provider>
    )
  }

}

export default App;
