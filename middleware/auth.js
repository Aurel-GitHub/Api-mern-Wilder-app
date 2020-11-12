const jwt = require('jsonwebtoken');

//middleware crée pour la sécurité des routes
module.exports = (req, res, next) => {
    try {
        //recup du token dans un tableau
        const token = req.headers.authorization.split(' ')[1];
        
        //décode le token par une via une verif du token et de sa clé 
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

        //recup de l'id et verification si c'est bien celui du token
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId != userId){
            throw 'User ID non valable !';
        }else{
            next(); //si la requete se passe bien elle est renvoyée ensuite vers le 2nd middleware
        }
    } catch (error) {
        //renvoi d'un 401 
        res.status(401).json({error : error | 'Requête non authentifiée !'})
    }
};


