import React, {Component} from 'react';
import axios from 'axios'
import {getTodos} from '../Actions/Todos'
import { connect } from 'react-redux'
import '../App.css'

const URL = 'http://localhost:8000/api/'

class Todo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            id: 0, name: '',location:'',
            newid: 0, 
        }
    }

   componentDidMount() {
      // console.log('props',this.props)
       this.props.getTodos()
   }

   renderTodos = () => {
       if (this.props.todos) {
           return this.props.todos.map( (todo, index) => {
             //  console.log( todo.name)
               return (<li key={index}> {todo.name}   {todo.location}       &nbsp;&nbsp;<button onClick={() => this.getTodo(index)}>GET</button>
                                                                            &nbsp;&nbsp;<button onClick={() => this.deleteTodo(index)}>DELETE</button> </li>
           )})
       }
   }

   deleteTodo = (id) => {
    axios.delete(`${URL}/Todos/${id}`)
        .then((res) => {
            // console.log('Delete:' + res)
            this.props.getTodos()
        })
}

addTodo = (e) => {
    e.preventDefault()
    axios.post(`${URL}/Todos`, {
        name: this.state.name,
        location: this.state.location
    })
        .then((res) => {
            console.log('Create a new Todo: ' + res);
            this.props.getTodos()
        })
}

handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
}


editTodo = (e) => {
    e.preventDefault()
    axios.put(`${URL}/Todos/${this.state.newid}`, { 
        name: this.state.newname , 
        location: this.state.newlocation 
    })
        .then((response) => {
            console.log('Create a new Todo: ' + response);
            this.props.getTodos()
        })
}


getTodo = (id) => {
    axios.get(`${URL}/Todos/${id}`)
        .then((res) => {
            // const {name} = res.data
            // console.log('res', res.data)
            this.setState({ newid: res.data.id, newname: res.data.name, newlocation: res.data.location })
            //console.log('state', this.state)
        })
}


   render() {
       return (
           <div style={{margin: '20px'}}>
               <h2>Render Todos</h2>
               <ul className="bullet-center">
                   {this.renderTodos()}
               </ul>

               <h2>Add Todo</h2>
                        <form onSubmit={this.addTodo}>
                            <br />
                            <input type="text" name="name" placeholder="Enter Todo" value={this.state.name} onChange={this.handleChange} />&nbsp;
                            <input type="text" name="location" placeholder="Enter Location" value={this.state.location} onChange={this.handleChange} />&nbsp;
                 
                    
                            <button>Submit</button>
                        </form>
                        <br />

                        <h2>Edit Todo</h2>
                        <form onSubmit={this.editTodo}>
                            <br />
                            <input type="text" name="newname" placeholder="Edit  Todo" value={this.state.newname} onChange={this.handleChange} />&nbsp;
                            <input type="text" name="newlocation" placeholder="Edit  Location" value={this.state.newlocation} onChange={this.handleChange} />&nbsp;
                    
                   
                            <button>UPDATE</button>
                        </form>
                        <br />


           </div>
       );
   }
}

const mapStateToProps =  ({todos}) => {
   return {todos}
}

const mapDispatchToProps = (dispatch) => {
   return {
    getTodos: () => dispatch(getTodos())
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(Todo);