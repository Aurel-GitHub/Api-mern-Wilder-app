const jwt = require('jsonwebtoken');

//gestion des erreurs du middleware crée pour la sécurité des routes
module.exports = (req, res, next) => {
    try {
        //recup du token dans un tableau
        const token = req.headers.authorization.split(' ')[1];
        
        //décode le token par une via une verif du token et de sa clé 
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    } catch (error) {
        //renvoi d'un 401 
        res.status(401).json({error : error | 'Requête non authentifiée !'})
    }
};
/***
 * https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466605-configurez-le-middleware-dauthentification
 * 
 * 3.39s
 */