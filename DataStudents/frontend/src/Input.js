import React from 'react';
import { connect } from 'react-redux';
import InputAction from './redux/input/actions';
import StudentAction from './redux/student/actions';

const inputDispatch = InputAction.dispatcher;
const studentDispatch = StudentAction.dispatcher;

class Input extends React.Component {

  constructor(props) {
        super(props)
        this.state = {
            students: [],
            id: '', name: '',surname:'',major:'',gpa:'',
            newid: ''
        }
    }

  render() {
    return (
      <div align='center'>
      <br/>
     <h2> ADD STUDENT</h2><br/>
      <strong>ID : </strong>  <input type='text' onChange={this.handleChange} value={this.state.newid} name='id' placeholder='id'/> <br/>
      <strong>Name : </strong>  <input type='text' onChange={this.handleChange} value={this.state.newname} name='name' placeholder='name'/> <br/>
       <strong>Surname : </strong> <input type='text' onChange={this.handleChange} value={this.state.newsurname} name='surname' placeholder='surname'/> <br/>
       <strong>Major : </strong> <input type='text' onChange={this.handleChange} value={this.state.newmajor} name='major' placeholder='major'/> <br/>
      <strong>GPA : </strong>  <input type='text' onChange={this.handleChange} value={this.state.newgpa} name='gpa' placeholder='gpa'/> <br/>
        <br/>
        <button onClick={this.handleAdd}>Submit</button>
      </div>
    )
  }

  handleChange = (e) => {
      const {name, value} = e.target;
      // eslint-disable-next-line
      switch (name) {
          case 'id': this.props.updateId(value); break;
          case 'name': this.props.updateName(value); break;
          case 'surname': this.props.updateSurname(value); break;
          case 'major': this.props.updateMajor(value); break;
          case 'gpa': this.props.updateGpa(value); break;
      }
  }

  handleAdd = () => {
      const {
          id,
          name,
          surname,
          major,
          gpa
      } = this.props.Input;
      this.props.addStudent({
          id,
          name,
          surname,
          major,
          gpa
      })
  }

}

export default connect(state => state, {
    ...inputDispatch,
    ...studentDispatch
})(Input);
