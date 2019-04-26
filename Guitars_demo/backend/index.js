const express = require('express')
const app = express()
const router = express.Router();
const cors = require('cors')
const bodyParser = require('body-parser')

let guitars = [{id: 1, name: 'lbanez RG 3120',price:30199},
    {id: 2, name: 'Fender Fat Strat Texas Special',price:40266},
    {id: 3, name: 'Gibson Lespaul Standard',price:250033}]

app.use(cors())
app.use('/api', bodyParser.json() ,router)
app.use('/api', bodyParser.urlencoded({extended:false}) ,router)

router.route('/guitars')
    .get( (req, res) =>  res.json(guitars) )

  
    .post( (req, res)=> {
        var guitar = {};
        guitar.id =   guitars[guitars.length-1].id +1  ;
        guitar.name = req.body.name
        guitar.price = req.body.price
        guitars.push(guitar);
        res.json( {message: 'guitar created!'} )
    })


router.route('/guitars/:guitar_id')
    .get ( (req,res) => {
        let id = guitars.findIndex( (guitar) => guitar.id === +req.params.guitar_id)
        res.json(guitars[id])
    })  

    .put ( (req,res) => {                              
        let id = guitars.findIndex( (guitar) => guitar.id === +req.params.guitar_id)
        guitars[id].name = req.body.name;
        guitars[id].price = req.body.price;
        res.json({ message: 'guitar updated!' + req.params.guitar_id});
    })

    .delete ( (req,res) => {                  
        guitars = guitars.filter( (guitar) => guitar.id !== +req.params.guitar_id )
        res.json({ message: 'guitar deleted: ' + req.params.guitar_id});
    })

app.listen(8000, () => console.log('server ready'))