const express = require('express')
var app = express()
const port = 3000

var bodyParser = require('body-parser')
app.use(bodyParser.json())

const router = express.Router()
const db = require('./db')

const students = [[0,"BillyBobz"], [1,"TomThumbz"], [2,"DuhmAhze"]]
const grades = [97, 87, 21]

app.get('/', (req, res) => res.send("see code for links"))

router.get('/students', (req, res) => {
    let name = req.query.search
    if(name != undefined){
        db.query(`SELECT * FROM students WHERE name = ` + name, (err, results) => {
            if(err){
                res.status(500).end()
            } else {
                res.status(200).json(results.rows)
            }
        })
    }
    else{
        db.query(`SELECT * FROM students`, (err, results) => {
            if(err){
                res.status(500).end()
            } else {
                res.status(200).json(results.rows)
            }
        })
    }
})


router.get('/students/:studentId', (req, res) => {
    db.query(`SELECT * FROM students WHERE studentId = ${studentId}`, (err, results) => {
        if(err){
            res.status(500).end()
        } else {
            res.status(200).json(results.rows)
        }
    })
})

router.get('/grades/:studentId', (req, res) => {
    db.query(`SELECT * FROM grades WHERE studentId = ${studentId}`, (err, results) => {
        if(err){
            res.status(500).end()
        } else {
            res.status(200).json(results.rows)
        }
    })
})

router.post('/grades', (req, res) => { 
    if(req.body.studentId != undefined && req.body.grade != undefined){   
         
        db.query('INSERT INTO grades (studentId, grade) VALUES (' + req.body.studentId + ', ' + req.body.grade + ')', (err, results) => {
            if(err){
                res.status(500).end()
            } else {
                res.status(200).send("Recorded grade " + req.body.grade + " for student " + req.body.studentId)
            }
        })
    }
})

router.post('/register', (req, res) => { 
    if(req.body.username != undefined && req.body.email != undefined){
        db.query('INSERT INTO user (username, email) VALUES (' + req.body.username + ', ' + req.body.email + ')', (err, results) => {
            if(err){
                res.status(500).end()
            } else {
                res.status(200).send("Created User " + req.body.username + " using " + req.body.email)
            }
        })   
    }
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))