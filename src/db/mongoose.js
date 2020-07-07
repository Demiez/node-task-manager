const mongoose = require('mongoose');
const CONNECTION_STRING = require('../constants/constants');

mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});