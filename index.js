const express = require('express')
var app = express()
const port = 3000

var bodyParser = require('body-parser')
app.use(bodyParser.json())

const students = [[0,"BillyBobz"], [1,"TomThumbz"], [2,"DuhmAhze"]]
const grades = [97, 87, 21]

app.get('/', (req, res) => res.send("Landing page"))

app.get('/students', (req, res) => {
    let name = req.query.search
    if(name != undefined){
        function search(student){
            return student[1].includes(name)
        }
        res.send(students.filter(search))
    }
    else{
        res.send(students);
    }
})


app.get('/students/:studentId', (req, res) => res.send(students[req.params.studentId]))

app.get('/grades/:studentId', (req, res) => res.send(grades[req.params.studentId]))

app.post('/grades', (req, res) => { 
    if(req.body.studentId != undefined && req.body.grade != undefined){   
        grades[req.body.studentId] = req.body.grade 
        console.log(req.body)    
        res.send("Recorded grade " + req.body.grade + " for student " + req.body.studentId)
    }
})

app.post('/register', (req, res) => { 
    if(req.body.username != undefined && req.body.email != undefined){   
        console.log(req.body)    
        res.send("Created User " + req.body.username + " using " + req.body.email)
    }
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))