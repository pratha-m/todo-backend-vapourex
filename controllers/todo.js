const { Todos } = require('../db/database');
const jwt = require('jsonwebtoken');

const create = async (req, res) => {
    const todoData = req.body;

    const cookieData = jwt.decode(req.cookies['access-token']);

    if (!cookieData) {
        return res.status(401).send({
            success: false,
            message: 'Invalid Token'
        });
    }

    // Parse the deadline field to a Date object
    if (todoData.deadline) {
        todoData.deadline = new Date(todoData.deadline);
    }

    try {
        const addTodo = await Todos.create({ ...todoData, refTo: cookieData.id });

        return res.status(201).send({
            success: true,
            message: 'Todo Added Successfully',
            todo: addTodo
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send({
            success: false,
            message: 'Failed to add todo',
            error: e.message
        });
    }
};

const getTodos = async (req, res) => {
    const cookieData = jwt.decode(req.cookies['access-token']);

    if (!cookieData) {
        return res.status(401).send({
            success: false,
            message: 'Invalid Token'
        });
    }

    try {
        const todos = await Todos.find({ refTo: cookieData.id }).sort({ deadline: 1 });

        return res.status(200).send({
            success: true,
            todos: todos
        });
    } catch (e) {
        return res.status(500).send({
            success: false,
            message: 'Failed to retrieve todos',
            error: e.message
        });
    }
};

const update = async (req, res) => {
    const todoId = req.params.id;
    const updateData = req.body;

    const cookieData = jwt.decode(req.cookies['access-token']);

    if (!cookieData) {
        return res.status(401).send({
            success: false,
            message: 'Invalid Token'
        });
    }

    if (updateData.deadline) {
        updateData.deadline = new Date(updateData.deadline);
    }

    try {
        const updatedTodo = await Todos.findByIdAndUpdate(
            todoId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            return res.status(404).send({
                success: false,
                message: 'Todo not found'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Todo Updated Successfully',
            todo: updatedTodo
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send({
            success: false,
            message: 'Failed to update todo',
            error: e.message
        });
    }
};

const deleteTodo = async (req, res) => {
    const todoId = req.params.id;

    try {
        const deletedTodo = await Todos.findByIdAndDelete(todoId);

        if (!deletedTodo) {
            return res.status(404).send({
                success: false,
                message: 'Todo not found'
            });
        }

        return res.send({
            success: true,
            message: 'Todo Deleted Successfully'
        });
    } catch (e) {
        return res.status(500).send({
            success: false,
            message: 'Failed to delete todo',
            error: e.message
        });
    }
};

module.exports = {
    create,
    getTodos,
    update,
    deleteTodo
};
