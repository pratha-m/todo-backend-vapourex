const express = require('express');
const { create, getTodos, update, deleteTodo } = require('../controllers/todo');
const { authUser } = require('../middlewares/authUser');

const router = express.Router();

router.post('/create', authUser, create);
router.get('/gettodos', authUser, getTodos);
router.put('/update/:id', authUser, update);
router.delete('/delete/:id', authUser, deleteTodo);

module.exports = router;