const db = require('./queries')
const express = require('express')
const cors = require('cors')
const data = require('./main')
const app = express()
const port = 8080
app.use(cors());
app.use(express.json())

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })
// app.get('/getdata',(request, response) => {
//   console.log("lol", data.val.array)
//   response.send(data.val.array)
// })
app.get('/getdata', data.getdata)

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })