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

module.exports = {
    renderTasks,
    getAllTasks,
    getTask,
    addTask,
    deleteTask,
    resetLikes
}