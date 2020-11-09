const mongoose = require("mongoose");



/**
 * Shema de Wilder
 */
const wilderShema = mongoose.Schema({
    name: {type: String, required: true},
    city: {type: String, required:true},
    urlImage: {type: String, required: true},
    skills: [{ title: String, count: Number },
            {type: Number, require:true}]

});

module.exports = mongoose.model('Wilder', wilderShema);




