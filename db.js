MongoClient = require('mongodb').MongoClient
dotenv = require('dotenv')
dotenv.config()
 
uri = process.env.MONGO_URI || "mongodb://localhost/miDB"


db = {}

MongoClient.connect(uri, {useUnifiedTopology:true})
MongoClient.connect(uri,)
.then( client => {
    console.log(" ==> connect to MongoDB")
    db = client.db('miDB')
})


//~ db.collection('tasks').find().toArray()
    //~ .then( data => {
        //~ console.log(data)
     //~ })
