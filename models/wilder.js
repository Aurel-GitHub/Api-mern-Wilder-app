const mongoose = require('mongoose');

/**
 * Shema de Wilder
 */
const wilderShema = mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    mail: {type: String, required: true},
    dateOfBirth: {type: date, required: true},
    age: {type: number, required:true},
    phone: {type: number, required: true},
    imageUrl: {type: String, required: true},
    hobbies: {type: String, required: false},
    online: {type: Boolean, default: false},
    skills: {
        title: {type: String, required:true},
        votes: {type: number, require:true}
    }
});

module.exports = mongoose.mongoose.model('Wilder', wilderShema);