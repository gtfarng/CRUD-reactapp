const express = require('express')
const app = express()
const router = express.Router();
const cors = require('cors')
const bodyParser = require('body-parser')

let songs = [{id: 1, name: 'Wonderful tonight',price:99},
    {id: 2, name: 'Morning star',price:66},
    {id: 3, name: 'Bohemian Rhapsody',price:253}]
   
app.use(cors())
app.use('/api', bodyParser.json() ,router)
app.use('/api', bodyParser.urlencoded({extended:false}) ,router)

router.route('/Songs')
    .get( (req, res) =>  res.json(songs) )

  
    .post( (req, res)=> {
        var song = {};
        song.id =   songs[songs.length-1].id +1  ;
        song.name = req.body.name
        song.price = req.body.price
        songs.push(song);
        res.json( {message: 'song created!'} )
    })


router.route('/Songs/:song_id')
    .get ( (req,res) => {
        let id = songs.findIndex( (song) => song.id === +req.params.song_id)
        res.json(songs[id])
    })  

    .put ( (req,res) => {                              
        let id = songs.findIndex( (song) => song.id === +req.params.song_id)
        songs[id].name = req.body.name;
        songs[id].price = req.body.price;
        res.json({ message: 'song updated!' + req.params.song_id});
    })

    .delete ( (req,res) => {                  
        songs = songs.filter( (song) => song.id !== +req.params.song_id )
        res.json({ message: 'song deleted: ' + req.params.song_id});
    })

app.listen(8000, () => console.log('server ready'))