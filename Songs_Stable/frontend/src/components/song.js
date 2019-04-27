import React, {Component} from 'react';
import {store} from "../App";
import {connect} from "react-redux";
import {getSongs, addSong, getSong, updateSong, deleteSong, handleChange } from "../actions"

class Song extends Component {

    componentDidMount = () => {
        this.props.getSongs()
    }

    renderSong = (name, price) => {
        if ( this.props.songsData )
            return  this.props.songsData.searchResults.map( (song,index) =>
                (<li key={index}>
                    {song.id} {song.name} {song.price}
                    <button onClick={()=> this.props.getSong(song.id)}>Edit</button>
                    <button onClick={()=>
                        this.props.updateSong(song.id,name,price)}>Update</button>

                    <button onClick={()=> this.props.deleteSong(song.id)}>Delete</button>
                </li>)
            )
    }


    render() {
        return (
            <div style={{margin: '20px'}}>
                <h2>CRUD Song list</h2>

                Search: <input type="text" name="search"
                               onChange={this.props.handleChange}
                               value={this.props.search} />

                <ul>
                    { this.renderSong(this.props.name,this.props.price)}
                </ul>

                Name: <input type="text" name="name"
                             onChange={ this.props.handleChange}
                             value={this.props.name}/> <br/>
                Price: <input type="number" name="price"
                              onChange={this.props.handleChange}
                              value={this.props.price}/> <br/>
                <button onClick={() => this.props.addSong(this.props.name, this.props.price)}>Add</button>
                {(this.props.songsData.message)?this.props.songsData.message:'' }




            </div>
        );
    }
}


const mapStateToProps = ( action  ) => {
    return {
        songsData: action.songsData,
        name: action.songsData.name,
        price: action.songsData.price,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getSongs:                 () => store.dispatch(getSongs()),
        addSong:        (name,price) => store.dispatch(addSong({name,price})),
        getSong:                (id) => store.dispatch(getSong(id)),
        updateSong: (id,name, price) => store.dispatch(updateSong(id,name,price)),
        deleteSong:             (id) => store.dispatch(deleteSong(id)),
        handleChange:            (e) => store.dispatch(handleChange(e))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Song);