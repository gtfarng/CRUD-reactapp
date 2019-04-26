import React, { Component } from 'react';
import axios from 'axios'
import { getSongs } from '../Actions/Songs'
import { connect } from 'react-redux'
import '../App.css'

const URL = 'http://localhost:8000/api/'

class Song extends Component {

    constructor(props) {
        super(props)
        this.state = {
            songs: [],
            id: 0, name: '', price: '',
            newid: 0,
        }
    }

    componentDidMount() {
        // console.log('props',this.props)
        this.props.getSongs()
    }

    renderSongs = () => {
        if (this.props.songs) {
            return this.props.songs.map((song, index) => {
                //  console.log( song.name)
                return (<li key={index}> {song.id}. {song.name}  {song.price}
                    &nbsp;<button onClick={() => this.getSong(index)}>Edit</button>
                   
                    &nbsp;<button onClick={() => this.deleteSong(index)}>Delete</button> </li>
                )
            })
        }
    }

    deleteSong = (id) => {
        axios.delete(`${URL}/Songs/${id + 1}`)
            .then((res) => {
                // console.log('Delete:' + res)
                this.props.getSongs()
            })
    }

    addSong = (e) => {
        e.preventDefault()
        axios.post(`${URL}/Songs`, {
            name: this.state.name,
            price: this.state.price
        })
            .then((res) => {
                console.log('Create a new Song: ' + res);
                this.props.getSongs()
            })
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleChangenew = (e) => {
        const { names, values } = e.target
        this.setState({ [names]: values })
    }

    handleChangesearh = (e) => {
        const { names, values } = e.target
       // this.setState({ [names]: values })
    }

    handletest = (e) => {
        this.setState({ [e.target.name] : e.target.value });
        console.log('Search',e.target.value)
        }


    editSong = (e) => {
        e.preventDefault()
        axios.put(`${URL}/Songs/${this.state.newid}`, {
            name: this.state.newname,
            price: this.state.newprice
        })
            .then((response) => {
                console.log('Create a new Song: ' + response);
                this.props.getSongs()
            })
    }


    getSong = (id) => {
        axios.get(`${URL}/Songs/${id + 1}`)
            .then((res) => {
                // const {name} = res.data
                // console.log('res', res.data)
                this.setState({ newid: res.data.id, newname: res.data.name, newprice: res.data.price })
                //console.log('state', this.state)
            })
    }


    render() {
        return (
            <div style={{ margin: '20px' }}>

            <h6><strong>Search:</strong>&nbsp;&nbsp;

<input type="text" name="search" placeholder="Enter to Search" value={this.state.search} onChange={this.handletest} /></h6>&nbsp;<br />

              <h2>Render Songs</h2>
                <ul className="bullet-center">
                    {this.renderSongs()}
                </ul>
                             
                <br/><h2>Add Song</h2>
                <form onSubmit={this.addSong}>
                    <br />
                    <strong>Name: </strong>   <input type="text" name="name" placeholder="Enter SongName" value={this.state.name} onChange={this.handleChange} />&nbsp;<br />
                    <strong>Price: </strong>  <input type="text" name="price" placeholder="Enter Price" value={this.state.price} onChange={this.handleChange} />&nbsp;<br />
                    <br />
                    <button>Submit</button>
                </form>

                <br /><h2>Edit Song</h2>
                <form onSubmit={this.editSong}>
                    <br />
                    <strong>Name: </strong>   <input type="text" name="newname" placeholder="Edit  SongName" value={this.state.newname} onChange={this.handleChange} />&nbsp;<br />
                    <strong>Price: </strong> <input type="text" name="newprice" placeholder="Edit  Price" value={this.state.newprice} onChange={this.handleChange} />&nbsp;<br />
                    <br />
                    <button>UPDATE</button>
                </form>
                <br />

                <br />


            </div>
        );
    }
}

const mapStateToProps = ({ songs }) => {
    return { songs }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSongs: () => dispatch(getSongs())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Song);