const express = require('express')
const app = express()
const router = express.Router();
const cors = require('cors')
const bodyParser = require('body-parser')

let songs = [{ id: 1, name: 'Wonderful tonight', price: 99 },
{ id: 2, name: 'Morning star', price: 66 },
{ id: 3, name: 'Bohemian Rhapsody', price: 253 },
]
/*let guitars = [{id: 1, name: 'Ibanez RG 3120', price: 30199},
    {id: 2, name: 'Fender Fat Strat Texas Special', price: 40266},
    {id: 3, name: 'Gibson Lespaul Standard', price: 250033},
 ]
*/
app.use(cors())
app.use('/api', bodyParser.json(), router)
app.use('/api', bodyParser.urlencoded({ extended: false }), router)

router.route('/songs')
    .get((req, res) => res.json(songs))

    // insert a new song
    .post((req, res) => {
        let song = {};
        song.id = songs[songs.length - 1].id + 1;
        song.name = req.body.name
        song.price = req.body.price
        songs.push(song);
        res.json({ message: 'song created!' })
    })


router.route('/songs/:song_id')
    .get((req, res) => {
        let id = songs.findIndex((song) => song.id === +req.params.song_id)
        res.json(songs[id])
    })  // get a song

    .put((req, res) => {                               // Update a song
        // var id = req.params.song_id
        let id = songs.findIndex((song) => song.id === +req.params.song_id)
        songs[id].name = req.body.name;
        songs[id].price = req.body.price;
        res.json({ message: 'song updated!' + req.params.song_id });
    })

    .delete((req, res) => {                   // Delete a song
        // delete     songs[req.params.song_id]
        songs = songs.filter((song) => song.id !== +req.params.song_id)
        res.json({ message: 'song deleted: ' + req.params.song_id });
    })

app.listen(8000, () => console.log('server ready:8000'))