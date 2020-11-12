const express = require('express');
const router = express.Router();
const Wilder = require('../models/wilder');

/**
 * GET{id}
 */
router.get('/:name', (req, res) => {
    Wilder.findOne({ name: req.params.name })
    .then(wilder => res.status(200).json(wilder))
    .catch(error => res.status(404).json({ error }));
  });
  

  router.post('/', (req, res) => {
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
  

  router.put('/:_id', (req, res) => {
    Wilder.updateOne({ _id: req.params._id }, {...req.body, _id: req.params._id })
      .then(() => res.status(200).json( {message: 'Objet modifié !'} ))
      .catch(error => res.status(400).json({ error }));
  });
  

  router.get('/', (req, res) => {
      Wilder.find()
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({error}));
  })
  

  router.delete('/:_id', (req, res) => {
    Wilder.deleteOne({ _id: req.params._id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });

  module.exports = router;
  