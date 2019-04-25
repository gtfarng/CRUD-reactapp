let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');

let router = express.Router();
let app = express();
app.use(cors());

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let studentIndex = 1;

let students = [
    { 
        'id': '5735512002', 
        'name': 'Jatupat', 
        'surname': 'Pannoi', 
        'major': 'COE', 
        'gpa': 2.50
    },
];

router.route('/Students')
    .get((req, res) => res.json(students))
    .post((req, res) => {
        var student = {};
        student.id = req.body.id;
        student.name = req.body.name;
        student.surname = req.body.surname;
        student.major = req.body.major;
        student.gpa = req.body.gpa;

        students.push(student);
        res.json(students)
    })

router.route('/Students/:student_id')
    .get((req, res) => {
        res.json(students[req.params.student_id])
    })  // get a bear
    .put((req, res) => {                               // Update a bear
        var id = req.params.student_id
        students[id].id = req.body.id;
        students[id].name = req.body.name;
        students[id].surname = req.body.surname;
        students[id].major = req.body.major;
        students[id].gpa = req.body.gpa;
        res.json(students);
    })
    .delete((req, res) => {                   // Delete a bear
        delete students[req.params.student_id]
        res.json(students);
    })

app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(8000, () => console.log("Server is running"));