const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Wilder = require('./models/wilder');

//connection à la db Mongo sur le cloud

mongoose.connect('mongodb+srv://samepassword:samepassword@cluster0.mppsp.mongodb.net/<dbname>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//création de l'application express
const app = express();

/**
 * middleware
 * mise en place d'un CORS 
 * pour permmettre à l'appli d'acceder à l'api
 * def : permet eviter des requetes malveillantes provenant d'autres serveurs sur notre api
 */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //tout le monde à accès à notre api
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');// autorisation d'utilisation de certains header sur l'objet requete)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//et autorisation de certaines méthodes 
    next();
});

/**
 * le bodyparser pour l'integration du json dans le body de la requete
 */
app.use(bodyParser.json());

/**
 * POST
 * on passe l'ensemble du contenu du model via l'opérateur spray . . .
 */
app.post('/api/wilder', (req, res, next) => {
    //suppression de l'id du corp de la requete pour eviter pb coté front
    delete req.body._id;  
   const wilder = new Wilder({  
    ...req.body
   });
   //methode save pour l'enrengistrement en base et retourne une promise then et catch
   wilder.save()
   .then(() => res.status(201).json({message: 'Objet enregistré !'}))
   .catch(error => res.status(400).json({error}));
});

// /**
//  * GET{id}
//  */
// app.get('/api/wilder/:name', (req, res, next) => {
//     wilder.findOne({ name: req.params.name })
//     .then(wilder => res.status(200).json(wilder))
//     .catch(error => res.status(404).json({error}));
// })

// /**
//  * GET  
//  */
// app.get('/api/wilder', (req, res, next) => {
//     wilder.find()
//     .then(wilders => res.status(200).json(wilders))
//     .catch(error => res.status(400).json({error}));
// });



//on exporte l'app pour qu'elle devienne accessible sur l'ensemble du projet
module.exports = app;