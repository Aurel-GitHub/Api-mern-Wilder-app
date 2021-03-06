const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

//middleware pour l'authentification    
exports.signup = (req, res, next) => {  
    bcrypt.hash(req.body.password, 10) //10 le salt qui indique le nbr de tour  ou l'algo de hachage est executé, ici 10 tours
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
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' }); //401=non autorisé
        }
        bcrypt.compare(req.body.password, user.password) //comparaison entre le mdp envoyé dans la requete et le hash enrengistré dans le user
          .then(valid => {
            if (!valid) { //si la comparaison n'est pas valable est renvoit false
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id, 
              //sign() prend en arg un payload -> données encodés
              token: jwt.sign(
                { userId: user._id }, //verification que la requete correspond bien à l'user.id plus haut +  pour eviter qu'un autre utilisateur modifie l'objet par crée
                'RANDOM_TOKEN_SECRET', //clé secrete pour l'encodage    à remplacer en prod par une chaine de caract !!
                { expiresIn: '24h' } //chaque token dure 24h au delà de 24h il n'est plus valable
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error })); //message d'erreur pb de co à MongoDB
  };