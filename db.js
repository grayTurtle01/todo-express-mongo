MongoClient = require('mongodb').MongoClient
// dotenv = require('dotenv')
// dotenv.config()
 
uri = process.env.MONGO_URI || "mongodb://localhost/miDB"


db = {}

MongoClient.connect(uri, {useUnifiedTopology:true})
MongoClient.connect(uri,)
.then( client => {
    console.log(" ==> connect to MongoDB by MongoClient")
    db = client.db('miDB')
})


//~ db.collection('tasks').find().toArray()
    //~ .then( data => {
        //~ console.log(data)
     //~ })


/*** Mongoose ***/
// mongoose = require('mongoose')

// mongoose.connect(uri)
// .then( db => console.log(' ==> db connected by mongoose'))
// .catch(err => console.log(err))

// var taskSchema = mongoose.Schema({
//     content: String,
//     done: Boolean 
// })

// Modelo = mongoose.model('tasks', taskSchema)



