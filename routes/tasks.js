let express = require('express')
let router = express.Router()

/*** Models ****/
const Task = require('../models/task')

/*** Controller ***/
let controller = require('../controllers/tasksController')

/*** Routes ***/
router.get('/', controller.renderTasks )

router.get('/tasks', controller.getAllTasks)

router.get('/tasks/:id', controller.getTask )

router.post('/tasks', controller.addTask)

router.delete('/tasks', controller.deleteTask)

router.get('/reset', controller.resetLikes)

router.get('/tasks/edit/:id', (req,res) => {

    
    Task.findById( req.params.id )
        .then( task => {
            res.render('edit.ejs', {'task': task})
        })
    
})


router.put('/tasks', (req, res)=> {
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
router.get('/tasks/toggle/:id', (req, res) =>{
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
router.put('/tasks/addLike', (req, res) => {

    Task.findById(req.body.id)
        .then( task => {
            task.likes = task.likes + 1
            task.save()
            res.json(task)
        })
        .catch( err => res.json({error: err}))
})

// UpRow
router.get('/tasks/upRow/:id', (req, res) => {
    
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

router.get('/tasks/downRow/:id', async (req, res) => {

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



module.exports = router