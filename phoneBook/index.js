const express= require('express');

var morgan = require('morgan')
const app= express();
app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))

app.use(morgan('tiny'))

const Persons= require('./person')





app.get('/persons', (request, response) => {
    Persons.find({}).then(person => {
        response.json(person)
      })
})

app.post('/persons', (request,response) => {
    const body = request.body

    if (body.name === undefined) {
      return response.status(400).json({ error: 'name missing' })
    }
  
    const person = new Persons({
      name: body.name,
      number: body.number 
    })
  
    person.save().then(savedNote => {
      response.json(savedNote)
    })
})

app.delete('/persons/:id', (request, response, next) => {
  Persons.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/persons/:id', (request, response, next) => {
  Persons.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
    // .catch(error => {
    //   console.log(error.name)
    //   response.status(400).send({ error: 'malformatted id' })
    // })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)
// app.get('/info',(request, response) => {
//     const numPersons = persons.length
//     const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
//     const c= new Date().toLocaleString('en-IN',options)
//     response.send(`
//     <p>Phonebook has info of ${numPersons} people.</p>
//     <p>${c}</p>
//     `)
    
// })

// app.get("/persons/:id", (req,res) =>{
//     let id = Number(req.params.id)
//     const element= persons.find(person=> person.id===id)
//     if(element){
//         res.send(element)

//     }
//     res.status(404).end()

// })

// app.delete("/persons/:id", (req,res) =>{
//     let id = Number(req.params.id)
//     console.log(id);
//     persons= persons.filter(person=> person.id!==id)
//     console.log(persons);
//     res.status(204).end()

// })

// app.post("/persons", (req,res) =>{
//     console.log(req.body);
//     const content= req.body
//     let name = content.name
//     let number= content.number
//     name=persons.find(person => person.name===name)
//     number=persons.find(person => person.number===number)
//     const decimal= Math.random() *1000
//     content.id=Math.floor(decimal)
//     if(name && number){
//         res.json({
//             "204": "enter unique name/number"
//         })
//     }
//     if(!name && !number){
//         persons=persons.concat(content)
//         res.json(content)
//     }
//     else if(!name){
//         let error={
//             "204": "enter a unique number"
//         }
//         res.json(error)
//     }
//     else if(!number){
//         let error= {
//             "204":"enter a unique name"
//         }
//         res.json(error)
//     }
    


// })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

