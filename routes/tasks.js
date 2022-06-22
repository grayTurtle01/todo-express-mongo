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

router.get('/tasks/edit/:id', controller.renderEditor)


router.put('/tasks', controller.updateTask)


// Flip State
router.get('/tasks/toggle/:id', controller.flipState)

// Add Like
router.put('/tasks/addLike', controller.addLike)

// UpRow
router.get('/tasks/upRow/:id', controller.uppRow)

router.get('/tasks/downRow/:id', controller.downRow)



module.exports = router