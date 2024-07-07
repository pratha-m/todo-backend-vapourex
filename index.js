const express = require('express');
const cookieParser = require('cookie-parser');
const nodemailer = require("nodemailer");
require("dotenv").config();

const { getUsersToNotify } = require('./Functions/notification');
const cron = require('node-cron');

const authentication = require('./routers/authentication');
const todos = require('./routers/todos');
const feature = require('./routers/feature');
const app = express();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD
    }
});


app.use(express.json());
app.use(cookieParser());


cron.schedule('0 * * * *', () => {  // runs every hour
    const notify = async() => {
        try {
            const users = await getUsersToNotify();
    
            for (const user of users) {
                const todosList = user.todos.map(todo => `<li>${todo.title}: ${todo.description}</li>`).join('');
                const emailContent = `
                    <p>Hello,</p>
                    <p>Here are your pending todos:</p>
                    <ul>
                        ${todosList}
                    </ul>
                    <p>Best regards,</p>
                    <p>Your Todo App</p>
                `;
    
                const info = await transporter.sendMail({
                    from: process.env.EMAIL_ID,
                    to: user.email,
                    subject: "Your Todos",
                    html: emailContent
                });
    
                console.log("Message sent to %s: %s", user.email, info.messageId);
            }
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };
    notify();
});

app.get('/', (req, res)=>{
    return res.send({
        message: 'Server is healthy'
    })
});

app.use('/auth', authentication);
app.use('/todos', todos);
app.use('/feature', feature);

app.listen(3000, () =>
    console.log('Server running successfully')
);