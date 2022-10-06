const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const cryptojs = require("crypto-js");


// FONCTION D'INSCRIPTION (ROUTE POST):
exports.signup = (req, res, next) => {
    // crypto-js pour crypter notre mail
    const emailCryptoJs = cryptojs
    .HmacSHA256(req.body.email, `${process.env.CRYPTOJS_KEY_FOR_EMAIL}`)
    .toString();

    console.log("password",req.body)
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          lastname: req.body.lastname,
          firstname : req.body.firstname,  
          email: emailCryptoJs,  // On remplace notre mail d'origine par la version cryptée
          password: hash,
          isadmin: false,
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

// FONCTION DE CONNEXION ( ROUTE POST) :  
exports.login = (req, res, next) => {
    // Pour réccupérer notre mail crypté

    const emailCryptoJs = cryptojs
    .HmacSHA256(req.body.email, `${process.env.CRYPTOJS_KEY_FOR_EMAIL}`)
    .toString();

    User.findOne({ email: emailCryptoJs })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                    
                        userId: user._id,
                        isAdmin: user.isadmin,                        
                        token: jwt.sign(
                            { userId: user._id, isAdmin: user.isadmin },
                            `${process.env.AUTH_TOKEN_JWT}`,
                            { expiresIn: '24h' }
                            
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };

// FONCTION D'OBTENTION D'UN USER EN FONCTION DE SON ID ( ROUTE GET )
exports.getOneUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error: error }))          
};


// FONCTION DE SUPPRESSION D'UN USER EN FONCTION DE SON ID ( ROUTE DELETE )
exports.deleteUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then((user) => {
                
                // Pour la comparaison des UserID on réccupère l'ID et la persmission d'admin en décryptant le token
                const token = req.headers.authorization.split(' ')[1];
                const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); 
                const userId = decodedToken.userId;
                const checkadmin = decodedToken.isAdmin 
                const authUser = user.id;

                console.log("checkadmin")
                console.log(checkadmin)
                console.log("userId")
                console.log(userId)
                
                
                    

                if (authUser === userId || checkadmin === true ) {
                    User.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Compte supprimé' }))
                        .catch(error => res.status(400).json({ message: error.message }));
                }
                else {  
                    res.status(403).json({
                        message: 'Vous ne pouvez pas supprimer ce compte !'
                    });                  
                }



         


               
            

        })
        .catch(error => res.status(500).json({ message: error.message }));
};