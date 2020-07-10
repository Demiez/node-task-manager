// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = provess.env.MONGO_CONNECTION_STRING;
const databaseName = 'task-manager';

// const id = new ObjectID();
// console.log(id)
// console.log(id.id.length)
// console.log(id.toHexString().length)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database')
    }

    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //     name: 'Victor',
    //     age: 26
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable insert user')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     },
    //     {
    //         name: 'Gunther',
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable insert user')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'This is a first Task',
    //         completed: true
    //     },
    //     {
    //         description: 'This is a second Task',
    //         completed: false
    //     },
    //     {
    //         description: 'This is a third task',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert tasks');
    //     }

    //     console.log(result.ops);
    // })

    // db.collection('users').findOne(
    //     {
    //         _id: new ObjectID("5f030fa6a4532634bc15ba8f"),
    //     },
    //     (error, user) => {
    //         if (error) {
    //             return console.log('Unable to fetch');
    //         }

    //         console.log(user)
    //     })

    // db.collection('users').find(
    //     {
    //         age: 27,
    //     }).toArray((error, users) => {
    //         console.log(users)
    //     })

    // db.collection('users').find(
    //     {
    //         age: 27,
    //     }).count((error, count) => {
    //         console.log(count)
    //     })

    // db.collection('tasks').findOne({
    //     _id: new ObjectID("5f03059d66614d0dc846536f"),
    // }, (error, task) => {
    //     if(error) {
    //         return console.log("Can't fetch data");
    //     }

    //     console.log(task);
    // })

    // db.collection('tasks').find({
    //     completed: false,
    // }).toArray((error, tasks) => {
    //     if(error) {
    //         return console.log("can't parse to Array")
    //     }

    //     console.log(tasks)
    // })

    // db.collection('users').updateOne(
    //     {
    //         _id: new ObjectID("5f03044b1cef2e275044052d")
    //     },
    //     {
    //         // $set: {
    //         //     name: 'April'
    //         // }
    //         $inc: {
    //             age: 1
    //         }
    //     }).then(result => {
    //         console.log(result);
    //     }).catch(error => {
    //         console.log(error);
    //     });

    // db.collection('tasks').updateMany(
    //     {
    //         completed: false
    //     },
    //     {
    //         $set: {
    //             completed: true
    //         }
    //     })
    //     .then(result => console.log(result.modifiedCount))
    //     .catch(error => console.log(error));

    // db.collection('users').deleteMany({
    //     age: 27
    // }).then(result => console.log(result))
    // .catch(error => console.log(error));

    db.collection('tasks').deleteOne({
        description: "This is a second Task"
    }).then(result => console.log(result.deletedCount))
    .catch(error => console.log(error));
})