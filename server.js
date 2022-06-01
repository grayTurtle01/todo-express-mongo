express = require('express')
bodyParser = require('body-parser')
require('./db')

mongo = require('mongodb')

app = express()

/*** Config ***/
app.set('view engine', 'ejs')

/*** Middlewares ***/
app.use( bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))

/*** Routes ***/
app.get("/", (req,res) => {
    

    db.collection('tasks').find().toArray()
    .then( data => {
        res.render('index.ejs', {tasks: data})
    })
    
})

 app.get("/tasks", (req,res) => {
     db.collection('tasks').find().toArray()
     .then( data => {
         res.json(data)
     })
 })

app.post("/tasks", (req, res) => {
    
    new_task = {
        content: req.body.content,
        done: false
    }

    db.collection('tasks').insertOne( new_task )
        .then( x => {
            // console.log(x)
            res.redirect('/')
     })
    
})

app.delete("/tasks", (req, res) =>{
    id = req.body.id

    db.collection('tasks').deleteOne( {'_id': mongo.ObjectId(id)})
    .then( x => {
       if( x.deletedCount == 0){
            res.json({status: 'task not found'})
        }
       else{
            res.json({status: 'task deleted'})
        }
            
    })
    
})

app.get("/tasks/edit/:id", (req,res) => {

    id = mongo.ObjectId( req.params.id )
    db.collection('tasks').findOne({'_id': id})
        .then( task => {
            //~ console.log(task)
            res.render('edit.ejs', {'task': task})
        })
    
})



app.put("/tasks", (req, res)=> {
    id = req.body.id
    content = req.body.content

    query = { '_id': mongo.ObjectId(id) }
    new_values = { $set: {'content': content } }
    options = {'upsert': true}

    db.collection('tasks').findOneAndUpdate(
                             query,
                             new_values,
                             options)
        .then(x => {
            //~ console.log(x)
            res.json({status: 'Task Updated'})
        })
        .catch( err => console.log(err)) 
})


// Flip State
app.get("/tasks/toggle/:id", (req, res) =>{
    id = req.params.id
    
    Modelo.findById(id, (err, task) => {
        if(err)
            res.json({status: err})
            
        task.done = !task.done
        task.save()
        res.json( task )
    })

    // query = {'_id': mongo.ObjectId(id)}
    // new_values = [
    //     // {$set: { done: {$not: "$done"} } }
    //     {$set: { done: {$eq:[false, "$done"]} } }
        
    // ]

    // db.collection('tasks').findOneAndUpdate( query, new_values)
    // .then( x => {
    //     task = x.value
    //     res.json( task )
    // })
    // .catch( err => console.log(err))

    
})


PORT = process.env.PORT || 8000
app.listen(PORT, ()=> console.log(" ==> Server Listen on port: " + PORT))
