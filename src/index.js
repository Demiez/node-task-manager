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

const jwt = require('jsonwebtoken');

const myFunction = async() => {
    const token = jwt.sign({ _id: "ab123"}, 'thisis', {expiresIn: '7 days'})
    console.log(token)

    const data = jwt.verify(token, 'thisis');
    console.log(data)
}

myFunction();

