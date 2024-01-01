const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://shashanksinghzero:${password}@cluster0.zxqbevh.mongodb.net/Person?retryWrites=true&w=majority`


mongoose.set('strictQuery',false)



mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})




const Persons = mongoose.model('Persons', personSchema)


module.exports = mongoose.model('Persons', personSchema)


