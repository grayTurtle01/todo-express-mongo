/*** Mongoose ***/
const mongoose = require('mongoose')

const uri = process.env.MONGO_URI || "mongodb://localhost/miDB"

mongoose.connect(uri)
.then( db => console.log(' ==> db connected by mongoose'))
.catch(err => console.log(err))


/*** Model  ****/
var taskSchema = mongoose.Schema({
    content: String,
    done: Boolean,
    likes: Number,
    position: Number 
})

const Task = mongoose.model('tasks', taskSchema)

module.exports = Task
