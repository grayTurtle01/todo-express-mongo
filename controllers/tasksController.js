const Task = require('../models/task')

function renderTasks(req, res ){

    Task.find({}).sort({position: 1})
    .then( array => {
        rows = array.length
        res.render('index.ejs', {tasks: array})
    })
    .catch( err => res.json({error: err}))
}

function getAllTasks(req,res){

    Task.find({})
        .then( data => {
            res.json(data)
        })
}

let getTask = (req, res) => {
    Task.findById(req.params.id)
        .then( task => res.json(task) )
        .catch(err => res.json({error: err}))
}

let addTask = (req, res) => {
    
    let new_task = {
        content: req.body.content,
        done: false,
        likes: 0,
        position : rows
        
    }

    Task.create( new_task )
        .then( task => {
            console.log(task)
            res.redirect('/')
        })
    
}

let deleteTask = async (req, res) =>{
    let id = req.body.id

    let task = await Task.findByIdAndRemove( id )
        
    if( !task ){
        res.json({status: 'task not found'})
    }
    else{

        await Task.updateMany({position: {$gt: task.position}}, {$inc: {position: -1}} )
    
        res.json({status: 'task deleted'})
    }   
}

let resetLikes = async (req,res) => {
    await Task.updateMany({}, {$set: {likes: 0}} )
   
    // res.json({status: 'likes reseted'})
    res.redirect('/')
}

let renderEditor = (req,res) => {
   
    Task.findById( req.params.id )
        .then( task => {
            res.render('edit.ejs', {'task': task})
        })
    
}

let updateTask = (req, res)=> {
    const id = req.body.id
    const content = req.body.content

  
    Task.findById(id)
        .then( task => {
            task.content = content
            task.save()

            res.json(task)
        })
                           
}

let flipState = (req, res) =>{
    let id = req.params.id
    
    Task.findById(id, (err, task) => {
        if(err)
            res.status(404).json({status: err})

        task.done = !task.done
        task.save()
        res.json( task )
    })
    
}

let addLike = (req, res) => {

    Task.findById(req.body.id)
        .then( task => {
            task.likes = task.likes + 1
            task.save()
            res.json(task)
        })
        .catch( err => res.json({error: err}))
}

let uppRow = (req, res) => {
    
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

}

let downRow = async (req, res) => {

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
}

module.exports = {
    renderTasks,
    getAllTasks,
    getTask,
    addTask,
    deleteTask,
    resetLikes,
    renderEditor,
    updateTask,
    flipState,
    addLike,
    uppRow,
    downRow
}