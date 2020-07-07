require ('../src/db/mongoose');
const Task = require('../src/models/task');

const id = '5f0432198919f72cd0a28e54'

//check

Task.findOneAndDelete({ _id: id}).then((task) => {
    if(!task) {
        return console.log ('Cannot find the task');
    }
    
    console.log(task);

    return Task.countDocuments({completed: false});
}).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
})