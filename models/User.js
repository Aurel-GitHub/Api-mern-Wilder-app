    const mongoose = require('mongoose');
    const uniqueValidator = require('mongoose');

    //unique pour rendre l'email d'inscription unique
    const userShema = mongoose.Schema({
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true}
    });

    //application du validator avant d'en faire un model
    userShema.plugin(uniqueValidator);

    module.export = mongoose.model('User', userShema);