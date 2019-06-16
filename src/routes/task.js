var express = require('express')
var router = express.Router()

const taskController = require('../controller/taskController.js')
router.get('/list',taskController.list)
router.get('/remove/:id', taskController.remove)
router.post('/create', taskController.create)
router.get('/update/:id', taskController.edit)
router.post('/update/:id', taskController.update)

module.exports = router