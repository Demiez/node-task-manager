const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('5f05ca851e1f982af0826631');
    // await task.populate('owner').execPopulate();
    // console.log(task.owner)

    const user = await User.findById('5f05c97a58699f299825a292');
    await user.populate('tasks').execPopulate();
    console.log(user.tasks)
}

main()