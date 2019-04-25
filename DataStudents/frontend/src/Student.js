import React from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import StudentAction from './redux/student/actions';

const dispatcher = StudentAction.dispatcher;

const URL = 'http://localhost:8000/api/'

class Student extends React.Component {

     constructor(props) {
        super(props)
        this.state = {
            students: [],
            id: '', name: '',surname:'',major:'',gpa:'',
            newid: ''
        }
    }

  getStudent = (id) => {
    axios.get(`${URL}/Students/${id}`)
        .then((res) => {
            // const {name} = res.data
             console.log('res', res.data)
                console.log('res', res.data.id)
            this.setState({ newid: res.data.id, newname: res.data.name,newsurname:res.data.surname,newmajor:res.data.major,newgpa:res.data.gpa })
            console.log('state', this.state)
        })
}

    render() {
        return (
            <div align="center"><br/>  <h2> RENDER STUDENT</h2><br/>
                {
                    this.props.Student.students.map((student, index) => student && (
                         <li>
                       
                            {student.id} &nbsp; &nbsp; 
                            {student.name} &nbsp; 
                            {student.surname} &nbsp; &nbsp; 
                            {student.major} &nbsp; &nbsp; 
                            {student.gpa} &nbsp; &nbsp; 
                            <button id={index} onClick={()=>this.getStudent(index)}>Get</button>
                           
                             <button id={index} onClick={this.handleDelete}>Delete</button>
                             <button id={index} onClick={this.handleUpdate}>Update</button>
                          
                         
                          </li>


                    ))
                }
 <br/><h2> EDIT STUDENT</h2><br/>
      <strong>ID : </strong>  <input type='text' onChange={this.handleChange} value={this.state.newid} name='id' placeholder='id'/> <br/>
      <strong>Name : </strong>  <input type='text' onChange={this.handleChange} value={this.state.newname} name='name' placeholder='name'/> <br/>
       <strong>Surname : </strong> <input type='text' onChange={this.handleChange} value={this.state.newsurname} name='surname' placeholder='surname'/> <br/>
       <strong>Major : </strong> <input type='text' onChange={this.handleChange} value={this.state.newmajor} name='major' placeholder='major'/> <br/>
      <strong>GPA : </strong>  <input type='text' onChange={this.handleChange} value={this.state.newgpa} name='gpa' placeholder='gpa'/> <br/>
        <br/>
        <button onClick={this.handleUpdate}>Submit</button>
     
            </div>
        )
    }

    componentDidMount() {
        this.props.fetchStudents();
    }

    handleUpdate = (e) => {
        const student = this.props.Input;
        this.props.updateStudent(e.target.id, student);
    }

    handleDelete = (e) => {
        this.props.deleteStudent(e.target.id)
    }

}

export default connect(state => state, dispatcher)(Student);
