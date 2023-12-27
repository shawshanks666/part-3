const express= require('express');
var morgan = require('morgan')
const app= express();
app.use(express.json())
const cors = require('cors')
app.use(cors())

app.use(morgan('tiny'))


let persons=
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get('/api/persons', (request,response) => {
    response.json(persons);
})

app.get('/info',(request, response) => {

    const numPersons = persons.length
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const c= new Date().toLocaleString('en-IN',options)
    response.send(`
    <p>Phonebook has info of ${numPersons} people.</p>
    <p>${c}</p>
    `)
    
})

app.get("/api/persons/:id", (req,res) =>{
    let id = Number(req.params.id)
    const element= persons.find(person=> person.id===id)
    if(element){
        res.send(element)

    }
    res.status(404).end()

})

app.delete("/api/persons/:id", (req,res) =>{
    let id = Number(req.params.id)
    persons= persons.find(person=> person.id!==id)
    res.status(204).end()

})

app.post("/api/persons", (req,res) =>{

    const content= req.body
    let name = content.name
    let number= content.number
    name=persons.find(person => person.name===name)
    number=persons.find(person => person.number===number)
    const decimal= Math.random() *1000
    content.id=Math.floor(decimal)
    console.log(name);
    if(name && number){
        res.json({
            "204": "enter unique name/number"
        })
    }
    if(!name && !number){
        persons=persons.concat(content)
        res.json(content)
    }
    else if(!name){
        let error={
            "204": "enter a unique number"
        }
        res.json(error)
    }
    else if(!number){
        let error= {
            "204":"enter a unique name"
        }
        res.json(error)
    }
    


})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})