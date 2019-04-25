const express = require('express')
const app = express()
const router = express.Router();
const cors = require('cors')
const bodyParser = require('body-parser')

let switchs = [{id: 0, band: 'CISCO', model: 'SG350-10', price: 7990},
    {id: 1, band: 'MIKROTIK', model: 'CSS326-24G-2S+RM', price: 6990},
    {id: 2, band: 'UBIQUITI ', model: 'US-8-150W', price: 8249}]

app.use(cors())
app.use('/api', bodyParser.json() ,router)
app.use('/api', bodyParser.urlencoded({extended:false}) ,router)

router.route('/switchs')
    .get( (req, res) =>  res.json(switchs) )

    .post( (req, res)=> {
        var switchh = {};
        switchh.id =   switchs[switchs.length-1].id +1  ;
        switchh.band = req.body.band
        switchh.model = req.body.model
        switchh.price = req.body.price
        switchs.push(switchh);
        res.json( {message: 'switch created!'} )
    })


router.route('/switchs/:switch_id')
    .get ( (req,res) => {
        let id = switchs.findIndex( (switchh) => switchh.id === +req.params.switch_id)
        res.json(switchs[id])
    }) 

    .put ( (req,res) => {                            
      
        let id = switchs.findIndex( (switchh) => switchh.id === +req.params.switch_id)
        switchs[id].band = req.body.band;
        switchs[id].model = req.body.model;
        switchs[id].price = req.body.price
        res.json({ message: 'switch updated!' + req.params.switch_id});
    })

    .delete ( (req,res) => {                   

        switchs = switchs.filter( (switchh) => switchh.id !== +req.params.switch_id )
        res.json({ message: 'switch deleted: ' + req.params.switch_id});
    })

app.listen(8000, () => console.log('server ready on port 8005\nhttp://localhost:8005/api/switchs'))