const mongoose = require('mongoose');

module.exports = function() {
    const db = 'mongodb://admin:admin123@ds145916.mlab.com:45916/project-pet'
    mongoose.connect(db, {
        useCreateIndex: true,
        useNewUrlParser: true
    })
    .then( () => console.log('Connectado ao MongoDB...'))
}