const jwt = require('jsonwebtoken');

//middleware crée pour la sécurité des routes
module.exports = (req, res, next) => {
    //bloc try & catch pour la gestion d'erreur
    try {
        //recup du token qui va etre retourné sous forme de tableau
        const token = req.headers.authorization.split(' ')[1];
        
        //décode le token grace a verify qui prend en argument le token et la clé secrete cree lors de la creation du token  
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

        //recupe le user.id dans le token
        const userId = decodedToken.userId;
            
        //verification si il y a un user.id dans la requete et qu'il correspondt bien à celui de la requete
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


