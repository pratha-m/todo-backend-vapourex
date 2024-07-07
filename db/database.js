const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todos_app')
      .then(() => console.log('Connected With Database Successfully'))
      .catch(() => console.log('Error Connecting with Database'));

const todoSchema = mongoose.Schema({
    title: String, 
    description: String,
    isDone: {type: Boolean, default: false},
    deadline: Date,
    refTo: mongoose.Schema.Types.ObjectId
}, { timestamps: true });

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

const Todos = mongoose.model('todos', todoSchema);
const User = mongoose.model('users', userSchema)

module.exports = {
    Todos,
    User
}