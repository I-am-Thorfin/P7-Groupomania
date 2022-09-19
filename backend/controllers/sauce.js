const Sauce = require('../models/sauce');
const fs = require('fs')
const jwt = require('jsonwebtoken');


////* OBTENTION DE TOUTES LES SAUCES *////

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error: error }))   
};

////* OBTENTION D'UNE SAUCE EN FONCTION DE SON ID *////

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error: error }))          
};

////* CREATION D'UNE SAUCE *////

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    console.log("Sauce",req.body) 
    sauce.save()      
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
        .catch(error => res.status(400).json({ error }))
};

////* MODIFICATION D'UNE SAUCE *////

/* Version simplement tirée du cours :*/

/*exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body }
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch(error => res.status(400).json({ error }))
};
*/

/* Version impliquant une vérification :*/
exports.modifySauce = (req, res, next) => {

    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
        // Pour la comparaison des UserID on réccupère l'idée en décryptant le token
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); 
        const userId = decodedToken.userId;
        console.log(sauce.userId)

        if (sauce.userId !== userId) {
            res.status(403).json({
                message: 'Vous ne pouvez modifier cette sauce'
            });
        }
        else {
            const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body }
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch(error => res.status(400).json({ error }))
        }
     });
};


////* SUPPRESSION D'UNE SAUCE *////

/* Version simplement tirée du cours */
/*exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) // nous utilisons l'ID que nous recevons en paramètres pour accéder à la Sauce correspondant dans la BDD
  
      .then((sauce) => {
        const filename = sauce.imageUrl.split("/images/")[1]; // On récupère avec la méthode split le nom ficher image dans l'URL
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(res.status(200).json({ message: "Sauce supprimée" }))
            .catch((error) => res.status(400).json({ error }));
        });
      })
      .catch((error) => res.status(500).json({ error }));
  };
*/

/* Version impliquant une vérification :*/
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
                
                // Pour la comparaison des UserID on réccupère l'idée en décryptant le token
                const token = req.headers.authorization.split(' ')[1];
                const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); 
                const userId = decodedToken.userId;
                console.log(sauce.userId)

                if (sauce.userId !== userId) {
                    res.status(403).json({
                        message: 'Vous ne pouvez pas supprimer cette sauce !'
                    });
                }
                else {
                    const filename = sauce.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        Sauce.deleteOne({ _id: req.params.id })
                            .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
                            .catch(error => res.status(400).json({ message: error.message }));
                    });
                }
            

        })
        .catch(error => res.status(500).json({ message: error.message }));
};


////* LIKE OU DISLIKE *////

exports.likeOrDislike = (req, res, next) => {
    if (req.body.like === 1) {
        Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } })
            .then((sauce) => res.status(200).json({ message: 'Like ajouté !' }))
            .catch(error => res.status(400).json({ error }))
    } 
    
    else if (req.body.like === -1) {
        Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } })
            .then((sauce) => res.status(200).json({ message: 'Dislike ajouté !' }))
            .catch(error => res.status(400).json({ error }))
    }
    
    else {
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
                        .then((sauce) => { res.status(200).json({ message: 'Like supprimé !' }) })
                        .catch(error => res.status(400).json({ error }))
                } 
                else if (sauce.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
                        .then((sauce) => { res.status(200).json({ message: 'Dislike supprimé !' }) })
                        .catch(error => res.status(400).json({ error }))
                }
            })
            .catch(error => res.status(400).json({ error }))
    }
}












