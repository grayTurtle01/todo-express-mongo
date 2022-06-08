const express = require('express')
const bodyParser = require('body-parser')


const app = express()

/*** Config ***/
app.set('view engine', 'ejs')

/*** Middlewares ***/
app.use( bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))


/*** Models ****/
const Task = require('./models/task')

/*** Routes ***/
app.get('/', (req,res) => {
    

    Task.find({})
        .then( array => {
            res.render('index.ejs', {tasks: array})
        })
        .catch( err => res.json({error: err}))
    
})

app.get('/tasks', (req,res) => {
    Task.find({})
        .then( data => {
            res.json(data)
        })
})

app.post('/tasks', (req, res) => {
    
    let new_task = {
        content: req.body.content,
        done: false
    }

    Task.create( new_task )
        .then( x => {
            console.log(x)
            res.redirect('/')
        })
    
})

app.delete('/tasks', (req, res) =>{
    let id = req.body.id

    Task.deleteOne( {'_id': id })
        .then( x => {
            if( x.deletedCount == 0){
                res.json({status: 'task not found'})
            }
            else{
                res.json({status: 'task deleted'})
            }
                    
        })
    
})

app.get('/tasks/edit/:id', (req,res) => {

    
    Task.findById( req.params.id )
        .then( task => {
            res.render('edit.ejs', {'task': task})
        })
    
})


app.put('/tasks', (req, res)=> {
    const id = req.body.id
    const content = req.body.content

  
    Task.findById(id)
        .then( task => {
            task.content = content
            task.save()

            res.json(task)
        })
                           
})


// Flip State
app.get('/tasks/toggle/:id', (req, res) =>{
    let id = req.params.id
    
    Task.findById(id, (err, task) => {
        if(err)
            res.status(404).json({status: err})

        task.done = !task.done
        task.save()
        res.json( task )
    })
    
})


const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> console.log(' ==> Server Listen on port: ' + PORT))
