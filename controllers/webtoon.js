const Todo = require('../models/Todo') //require models

module.exports = { // not sure why this is defined like so is this an unnamed object?
    getTodos: async (req,res)=>{ //get todos object with an async method
        try{
            const todoItems = await Todo.find() // find todo items in db put in var
            const itemsLeft = await Todo.countDocuments({completed: false}) // find todo items in db with property of not completed
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft}) //render todo items with two objects for ejs one is todos and another is left (todos left)
        }catch(err){ // log err
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{ // create a todo
        try{
            await Todo.create({todo: req.body.todoItem, completed: false}) // in req body set todo to todoitem and completed to false
            console.log('Todo has been added!') //log message
            res.redirect('/todos') // redirect to todo route
        }catch(err){ // log error
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{ // put request find todo with with property of true
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{ //put request find todo with property of false
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile}) //find todo with these props and delete from db
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    