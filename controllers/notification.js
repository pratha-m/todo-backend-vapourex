const { Todos, User } = require('../db/database');

const notification = async (req, res) => {
    try {
        const oneDayFromNow = new Date();
        oneDayFromNow.setDate(oneDayFromNow.getDate() + 1); // Calculate date 1 day from now

        // Fetch todos due within one day
        const todosDueInOneDay = await Todos.find({
            deadline: { $lte: oneDayFromNow } // Find todos with deadline less than or equal to one day from now
        });

        // Prepare response
        let response = [];
        if (todosDueInOneDay.length > 0) {
            // Group todos by email
            const groupedTodos = {};
            for (const todo of todosDueInOneDay) {
                const user = await User.findById(todo.refTo);
                if (user) {
                    const userEmail = user.email;
                    if (!groupedTodos[userEmail]) {
                        groupedTodos[userEmail] = {
                            email: userEmail,
                            todos: []
                        };
                    }
                    groupedTodos[userEmail].todos.push({
                        title: todo.title,
                        description: todo.description,
                        deadline: todo.deadline
                    });
                }
            }

            // Convert groupedTodos object to array
            response = Object.values(groupedTodos);
        } else {
            response = { message: 'No todos with deadlines within 1 day' };
        }

        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Failed to retrieve notifications',
            error: error.message
        });
    }
};

module.exports = {
    notification
};
