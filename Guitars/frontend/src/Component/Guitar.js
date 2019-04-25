import React, {Component} from 'react';
import axios from 'axios'
import {getGuitars} from '../Actions/Guitars'
import { connect } from 'react-redux'
import '../App.css'

const URL = 'http://localhost:8000/api/'

class Guitar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            guitars: [],
            id: 0, name: '',price:'',
            newid: 0,
        }
    }

   componentDidMount() {
       console.log('props',this.props)
       this.props.getGuitars()
   }

   renderGuitars = () => {
       if (this.props.guitars) {
           return this.props.guitars.map( (guitar, index) => {
             //  console.log( guitar.name)
               return (<li key={index}> {guitar.name}  {guitar.price}       &nbsp;&nbsp;<button onClick={() => this.getGuitar(index)}>GET</button>&nbsp;&nbsp;<button onClick={() => this.deleteGuitar(index)}>DELETE</button> </li>
           )})
       }
   }

   deleteGuitar = (id) => {
    axios.delete(`${URL}/Guitars/${id+1}`)
        .then((res) => {
            // console.log('Delete:' + res)
            this.props.getGuitars()
        })
}

addGuitar = (e) => {
    e.preventDefault()
    axios.post(`${URL}/Guitars`, {
        name: this.state.name,
        price: this.state.price
    })
        .then((res) => {
            console.log('Create a new Guitar: ' + res);
            this.props.getGuitars()
        })
}

handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
}


editGuitar = (e) => {
    e.preventDefault()
    axios.put(`${URL}/Guitars/${this.state.newid}`, { name: this.state.newname,price:this.state.newprice })
        .then((response) => {
           // console.log('Create a new Guitar: ' + response);
            this.props.getGuitars()
        })
}


getGuitar = (id) => {
    axios.get(`${URL}/Guitars/${id+1}`)
        .then((res) => {
            // const {name} = res.data
            // console.log('res', res.data)
            this.setState({ newid: res.data.id, newname: res.data.name,newprice:res.data.price })
            //console.log('state', this.state)
        })
}


   render() {
       return (
           <div style={{margin: '20px'}}>
               <h2>Render Guitars</h2>
               <ul className="bullet-center">
                   {this.renderGuitars()}
               </ul>

               <h2>Add Guitar</h2>
                        <form onSubmit={this.addGuitar}>
                            <br />
                            <input type="text" name="name" placeholder="Enter Guitar" value={this.state.name} onChange={this.handleChange} />&nbsp;
                            <input type="number" name="price" placeholder="Enter Price" value={this.state.price} onChange={this.handleChange} />&nbsp;
                            {/*
                            <input type="text" name="name" placeholder="Enter Guitar" value={this.state.newname} onChange={this.handleChange} />&nbsp;
                            <input type="number" name="price" placeholder="Enter Price" value={this.state.newprice} onChange={this.handleChange} />&nbsp;
                            */}
                            <button>Submit</button>
                        </form>
                        <br />

                        <h2>Edit Guitar</h2>
                        <form onSubmit={this.editGuitar}>
                            <br />
                            <input type="text" name="newname" placeholder="Edit  Guitar" value={this.state.newname} onChange={this.handleChange} />&nbsp;
                            <input type="number" name="newprice" placeholder="Edit  Price" value={this.state.newprice} onChange={this.handleChange} />&nbsp;
                    
                   
                            <button>UPDATE</button>
                        </form>
                        <br />


           </div>
       );
   }
}

const mapStateToProps =  ({guitars}) => {
   return {guitars}
}

const mapDispatchToProps = (dispatch) => {
   return {
    getGuitars: () => dispatch(getGuitars())
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(Guitar);