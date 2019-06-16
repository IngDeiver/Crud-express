const Task = require('../models/Task.js')

const list = (req, res, next) => {
    Task.find({}, (err, tasks) => {
        if (err)
            next(new Error('Error list tasks', 500))
       
        res.render('tasks/list.pug', {task_list: tasks})
    })
}
const remove = (req, res, next) => {
    console.log(req.params.id)
    Task.deleteOne({_id:req.params.id}, (err) => {
        if (err)
            next(new Error('Error delete task', 500))
        res.redirect('/task/list')
    })
}

const create = (req, res, next) =>{
    const newtask = new Task(req.body)
    newtask.save((err,task) =>  {
        if (err)
            next(new Error('Error add task', 500))
        res.redirect('/task/list')
    })
}

const update = (req, res, next) =>{

    Task.updateOne({_id:req.params.id}, {title: req.body.title, description: req.body.description}, (err, resp) => {
        console.log(resp)
        if (err)
            next(new Error('Error update task', 500))

        res.redirect('/task/list')
    })
}

const edit = (req, res, next) => {
    Task.findById(req.params.id, (err, task) => {
        if (err)
             next(new Error('Error find task', 500))
        
        res.render('tasks/edit.pug', {task:task})
    })
}

module.exports = {
    list,
    remove,
    create,
    update,
    edit
}