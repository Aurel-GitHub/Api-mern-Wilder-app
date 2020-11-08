const express = require('express');
const bodyParser = require('body-parser');

//connection à la db Mongo sur le cloud
const mongoose = require('mongoose');
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

app.post('/api/wilder', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({message: 'Votre objet a bien été crée !'});
});



//middleware
app.use('/api/wilder', (req, res, next) => {
    const wilder = [
    {
        _id: 'fdss113sfsf',
        name: 'John Doe',
        city: 'Bayonne',
        urlImage: 'http://lorempixel.com/400/200/sports',
        skills: [{ title: 'HTML', votes: 9}],
    }];
res.status(200).json(wilder);
});

//on exporte l'app pour qu'elle devienne accessible sur l'ensemble du projet
module.exports = app;