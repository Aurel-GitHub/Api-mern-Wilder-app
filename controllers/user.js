const bcrypt = require('bcrypt');
const User = require('../models/User');

//middleware pour l'authentification    
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) //10 le salt qui indique cmb de fois on excute l'algo de hachage
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash  
            });
            user.save()
                .then(() => res.status(201).json({message: 'Utilisateur crée !'}))
                .catch(error => res.status(400).json({error}));
            })
        .catch(error => res.status(500).json({error}));
};  

exports.login = (req, res, next) => {

};