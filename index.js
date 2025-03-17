require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))

morgan.token('post-data', (req) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    }
    return '-'; // Return '-' for non-POST requests
});

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})



app.use((error, request, response, next) => {
    console.error(error.stack)
    response.status(500).send('Something broke!')
})

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})