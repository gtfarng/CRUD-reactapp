import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { fetchSwitchs } from '../Actions';
import '../App.css'


const URL = 'http://localhost:8000/api/';

class Switchs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            switchs: [], neww: '',
            id: 0, band: '', model: '', 
            newid: 5735512002, newband: 'GTfarng', newmodel: 'lockerz', newprice: 5555
        }
    }

    componentDidMount() {
        this.getAllSwitchs()
    }

    getAllSwitchs() {
        axios.get(`${URL}/switchs`)
            .then(res => {
                this.setState({ switchs: res.data })
                console.log('DATA => ', res.data)
            }
            )
            .catch((error) => { console.log(error); })
    }

    renderSwitchs = () => { // eslint-disable-next-line
        return this.state.switchs.map((switchh, index) => {
            if (switchh)
                return (
                    <li className="bullet-center" key={index}>
                        {switchh.id}. {switchh.band} {switchh.model} price {switchh.price} bht. &nbsp;&nbsp;
                             <button onClick={() => this.getSwitch(index)}>GET</button> &nbsp;
                            <button onClick={() => this.deleteSwitch(index)}>DELETE</button> &nbsp;
                             <button onClick={() => this.getSwitch(index)}>EDIT</button> &nbsp;
                        </li>
                )

        })
    }

    deleteSwitch = (id) => {
        console.log('ID=>', id)
        axios.delete(`${URL}/switchs/${id}`)
            .then((res) => {
                console.log('Delete Switch!: ' + res)
                this.getAllSwitchs()
            })
    }

    addSwitch = (e) => {
        e.preventDefault()
        axios.post(`${URL}/switchs`, {
            band: this.state.band,
            model: this.state.model,
            price: this.state.price
        })
            .then((res) => {
                console.log('Create a new Switch! :' + res);
                this.getAllSwitchs()
            })
    }

    getSwitch = (id) => {
        axios.get(`${URL}/switchs/${id}`)
            .then((res) => {

                console.log('get:', res.data)
                console.log('new state:', res.data.id)
                this.setState({ newid: res.data.id })
                this.setState({ newband: res.data.band })
                this.setState({ newmodel: res.data.model })
                this.setState({ newprice: res.data.price })

                console.log('set state:', this.state)

            })
    }

    editSwitch = (e) => {
        e.preventDefault()
        axios.put(`${URL}/switchs/${this.state.id}`, {
            band: this.state.newband,
            model: this.state.newmodel,
            price: this.state.newprice
        })

            .then((response) => {
                console.log('update Switch: ' + response);
                this.getAllSwitchs()
            })


    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    

    render() {
        return (
            <div>



                <br /><div className="container justify">
                    <h5>Frontend => axios, react-redux, redux, redux-thunk, redux-logger </h5>
                    <h5>Backend => express, cors, router, body-parser</h5>
                </div>
                <br />

                <br />
                <div class="card container">
                    <div class="card-body">


                        <br /> <h2>Render Switch</h2><br />
                        <ul className="bullet-center">
                            {this.renderSwitchs()}
                        </ul>

                    </div>
                </div>
                <br />
                <div class="card container">
                    <div class="card-body">

                        <br />   <h3>Get Switch</h3> <br />

                        {this.state.newid}. {this.state.newband} {this.state.newmodel} price {this.state.newprice} bht. &nbsp;&nbsp;
                        
<br /><br />


                    </div>
                </div>
                <br />
                <div class="card container">
                    <div class="card-body">

                        <br />  <h3>Add Switch</h3> <br />
                        <form onSubmit={this.addSwitch}>

                        <strong>BRAND : </strong>  &nbsp;<input type="text" name="band" placeholder="Enter Band" value={this.state.name} onChange={this.handleChange} />&nbsp;<br />
                        <strong>MODEL : </strong>   &nbsp;<input type="text" name="model" placeholder="Enter Model" value={this.state.model} onChange={this.handleChange} />&nbsp;<br />
                        <strong>PRICE : </strong>  &nbsp;<input type="number" name="price" placeholder="Enter Price"  value={this.state.price}  onChange={this.handleChange} />&nbsp;<br /><br />

                            <button>SUBMIT</button>
                        </form>


                        <br />


                    </div>
                </div>
                <br />
                <div class="card container">
                    <div class="card-body">

                        <br />  <h3>Edit Switch</h3> 
                        <form onSubmit={this.editSwitch}>
                            <input type="hidden" name="newid" placeholder="Edit ID" value={this.state.newid} onChange={this.handleChangenew} />&nbsp;<br/>
                            <strong>BRAND : </strong>&nbsp;<input type="text" name="newband" placeholder="Edit Band" value={this.state.newband} onChange={this.handleChange} />&nbsp;<br/>
                            <strong> MODEL : </strong>&nbsp;<input type="text" name="newmodel" placeholder="Edit Model" value={this.state.newmodel}  onChange={this.handleChange} />&nbsp; <br/>       
                            <strong>PRICE :</strong> &nbsp;<input type="number" name="newprice" placeholder="Edit Price" value={this.state.newprice} onChange={this.handleChange} />&nbsp;<br/>

                           
                    <br />

                            <button>UPDATE</button>
                        </form>
                        <br />


                    </div>
                </div>



                <br />
                <br />

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

}

const mapStateToProps = ({ switchs }) => {
    return { switchs }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchSwitchs: () => dispatch(fetchSwitchs())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Switchs);