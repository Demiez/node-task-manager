const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();

// Without middleware: new request -> run route handler
// With middleware: new request -> do something -> run route handler

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled');
//     } else {
//         next();
//     }
// });

// app.use((req, res, next) => {
//     res.status(503).send('Sorry, site is under maintenance. Please try again later');
// })

app.use(express.json()); //parces automatically to json
app.use(userRouter);
app.use(taskRouter);

app.get('/', (req, res) => {
    res.send('Welcome to Task Manager');
});

module.exports = app;
