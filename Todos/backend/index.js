const express = require('express')
const app = express()
const router = express.Router();
const cors = require('cors')
const bodyParser = require('body-parser')

let todos = [{id: 0, name: 'Programming',location:'CoE Lab'},
    {id: 1, name: 'Developing',location:'GT Studio'},
    {id: 2, name: 'Installing',location:'Out site'},
    {id: 3, name: 'Coding',location:'Company office'}]

app.use(cors())
app.use('/api', bodyParser.json() ,router)
app.use('/api', bodyParser.urlencoded({extended:false}) ,router)

router.route('/todos')
    .get( (req, res) =>  res.json(todos) )

  
    .post( (req, res)=> {
        var todo = {};
        todo.id =   todos[todos.length-1].id +1  ;
        todo.name = req.body.name
        todo.location = req.body.location
        todos.push(todo);
        res.json( {message: 'todo created!'} )
    })


router.route('/todos/:todo_id')
    .get ( (req,res) => {
        let id = todos.findIndex( (todo) => todo.id === +req.params.todo_id)
        res.json(todos[id])
    })  

    .put ( (req,res) => {                              
        let id = todos.findIndex( (todo) => todo.id === +req.params.todo_id)
        todos[id].name = req.body.name;
        todos[id].location = req.body.location;
        res.json({ message: 'todo updated!' + req.params.todo_id});
    })

    .delete ( (req,res) => {                  
        todos = todos.filter( (todo) => todo.id !== +req.params.todo_id )
        res.json({ message: 'todo deleted: ' + req.params.todo_id});
    })

app.listen(8000, () => console.log('server ready'))