const Wilder = require('../models/wilder')

exports.createWilder = (req, res, next) => {
    //suppression de l'id du corp de la requete pour eviter pb coté front
    delete req.body._id;  
        const wilder = new Wilder({ ...req.body })
    //methode save pour l'enrengistrement en base et retourne une promise then et catch
    wilder.save()
        .then(() => res.status(201).json({message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({error}));
};

exports.modifyWilder = (req, res) => {
    Wilder.updateOne({ _id: req.params._id }, {...req.body, _id: req.params._id })
    .then(() => res.status(200).json( {message: 'Objet modifié !'} ))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteWilder =  (req, res) => {
    Wilder.deleteOne({ _id: req.params._id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.getOneWilder = (req, res) => {
    Wilder.findOne({ name: req.params.name })
        .then(wilder => res.status(200).json(wilder))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllWilder = (req, res) => { 
    Wilder.find()
      .then(result => res.status(200).json(result))
      .catch(error => res.status(400).json({error}));
};