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

module.exports = {
    renderTasks,
    getAllTasks
}