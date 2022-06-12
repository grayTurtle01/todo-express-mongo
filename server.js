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
let rows = 0;
app.get('/', (req,res) => {
    

    Task.find({}).sort({position: 1})
        .then( array => {
            rows = array.length
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
        done: false,
        likes: 0,
        position : rows
        
    }

    Task.create( new_task )
        .then( x => {
            console.log(x)
            res.redirect('/')
        })
    
})

app.delete('/tasks', async (req, res) =>{
    let id = req.body.id


    let task = await Task.findByIdAndRemove( id )
        
        if( !task ){
            res.json({status: 'task not found'})
        }
        else{

            await Task.updateMany({position: {$gt: task.position}}, {$inc: {position: -1}} )
        
                
            res.json({status: 'task deleted'})
    

        }
                
    
    
})

app.get('/foo', async (req,res) => {
    await Task.updateMany({}, {$inc: {likes: -1}} )
   

    res.json({status: 'foo working'})
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

// Add Like
app.put('/tasks/addLike', (req, res) => {

    Task.findById(req.body.id)
    .then( task => {
        task.likes = task.likes + 1
        task.save()
        res.json(task)
    })
    .catch( err => res.json({error: err}))
})

// UpRow
app.get('/tasks/upRow/:id', (req, res) => {
    
    Task.findById(req.params.id)
        .then( task => {
            if( task.position == 0){
                res.json({status: 'the row is on the top'})
            }
            else{
                Task.findOne({position : task.position - 1 })
                    .then( upperTask => {
                        let tmp = task.position
                        task.position = upperTask.position
                        upperTask.position = tmp

                        task.save()
                        upperTask.save()    

                        res.json({status: 'rows exchanged'})    
                    } )
                    .catch( err => console.log(err))
            }
        })

})

app.get('/tasks/downRow/:id', async (req, res) => {

    let task  = await Task.findById(req.params.id)

    if( task.position == (rows-1)  ){
        res.json({status: 'the last row'})
    }
    else{
        let lowerTask = await Task.findOne({position: task.position + 1})

        let tmp = task.position
        task.position = lowerTask.position
        lowerTask.position = tmp

        task.save()
        lowerTask.save()

        res.json({status: 'rows exchanged'})
    }
})


const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> console.log(' ==> Server Listen on port: ' + PORT))
