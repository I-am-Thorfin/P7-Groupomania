const Comment = require('../models/Comment');
const fs = require('fs')
const jwt = require('jsonwebtoken');


////* OBTENTION DE TOUS LES COMMENTAIRES *////

exports.getAllComments = (req, res, next) => {
    Comment.find()
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error: error }))   
};

////* OBTENTION D'UN COMMENTAIRE EN FONCTION DE SON ID *////

exports.getOneComment = (req, res, next) => {
    Comment.findOne({ _id: req.params.id })
        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(404).json({ error: error }))          
};

////* CREATION D'UN COMMENTAIRE *////

exports.createComment = (req, res, next) => {
    console.log("///////req.body/////")
    console.log(req.body)
    console.log("////////////")

    console.log("///////req.body.comment ( Parse Jason )/////")
    console.log(JSON.parse(req.body.comment))
    console.log("////////////")

    console.log("///////req.file")
    console.log(req.file)
    console.log("////////////")
    
    const commentObject = JSON.parse(req.body.comment)
    delete commentObject._id

    // --------> SI : Le Front nous envoie une image :

    if ( req.file !== undefined) { const comment = new Comment({
        ...commentObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        isImage : true
    });
   // console.log("Comment",req.body) 
    comment.save()      
        .then(() => res.status(201).json({ message: 'Commentaire !' }))
        .catch(error => res.status(400).json({ error }))  }
    
    // --------> SI : Le Front ne nous envoie pas d'image :    

    else { const comment = new Comment({
        ...commentObject,
        imageUrl: ``
    });
   // console.log("Comment",req.body) 
    comment.save()      
        .then(() => res.status(201).json({ message: 'Commentaire !' }))
        .catch(error => res.status(400).json({ error }))  }



    
};





/* Version impliquant une vérification :*/
exports.modifyComment = (req, res, next) => {

    Comment.findOne({ _id: req.params.id })
    .then((comment) => {
        // Pour la comparaison des UserID on réccupère l'id en décryptant le token
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); 
        const userId = decodedToken.userId;
        console.log(comment.userId)
        

        console.log("///////req.file")
        console.log(req.file)
        console.log("////////////")

        console.log("///////req.body.comment ( Parse Json )/////")
        console.log(JSON.parse(req.body.comment))
        console.log("////////////")

        if (comment.userId !== userId) {
            res.status(403).json({
                message: 'Vous ne pouvez modifier ce commentaire'
            });
        }
        else {
            const modifyObject = JSON.parse(req.body.comment)
            const commentObject = req.file ?
        {
            ...modifyObject,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            
            
        } : { ...modifyObject }
    Comment.updateOne({ _id: req.params.id }, { ...commentObject, _id: req.params.id })
    
    
    .then(() => res.status(200).json({ message: 'Commentaire modifiée !' }))
    .catch(error => res.status(400).json({ error }))
        }
     });
};




/* Version impliquant une vérification :*/
exports.deleteComment = (req, res, next) => {
    Comment.findOne({ _id: req.params.id })
        .then((comment) => {
                
                // Pour la comparaison des UserID on réccupère l'idée en décryptant le token
                const token = req.headers.authorization.split(' ')[1];
                const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); 
                const userId = decodedToken.userId;
                const isAdmin = decodedToken.isAdmin;
                console.log(comment.userId)

                console.log(isAdmin)

                if ( (comment.userId !== userId) && (isAdmin === false) ) {
                    res.status(403).json({
                        message: 'Vous ne pouvez pas supprimer ce commentaire !'
                    });
                }
                else {
                    const filename = comment.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        Comment.deleteOne({ _id: req.params.id })
                            .then(() => res.status(200).json({ message: 'Commentaire supprimée !' }))
                            .catch(error => res.status(400).json({ message: error.message }));
                    });
                }
            

        })
        .catch(error => res.status(500).json({ message: error.message }));
};


////* LIKE OU DISLIKE *////

exports.likeOrDislike = (req, res, next) => {

    Comment.findOne({ _id: req.params.id })
    .then(comment => {


    if (req.body.like === 1) {

        if( comment.usersLiked.includes(req.body.userId)) {
            Comment.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
                            .then((comment) => { res.status(200).json({ message: 'Like supprimé !' }) })
                            .catch(error => res.status(400).json({ error }))            
        }

        else if (comment.usersDisliked.includes(req.body.userId)) {
            Comment.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1, likes: req.body.like++ }, $push: { usersLiked: req.body.userId }  })
                .then((comment) => { res.status(200).json({ message: 'Dislike supprimé et like ajouté !' }) })
                .catch(error => res.status(400).json({ error }))

        }

        else { Comment.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } })
        .then((comment) => res.status(200).json({ message: 'Like ajouté !' }))
        .catch(error => res.status(400).json({ error })) }
    }  
    
    else if (req.body.like === -1) { 
        if( comment.usersDisliked.includes(req.body.userId)) {
            Comment.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
                            .then((comment) => { res.status(200).json({ message: 'Dislike supprimé !' }) })
                            .catch(error => res.status(400).json({ error }))         
        }

        else if ( comment.usersLiked.includes(req.body.userId) ) {
            Comment.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1, dislikes: (req.body.like++)*-1}, $push: { usersDisliked: req.body.userId } })
                            .then((comment) => { res.status(200).json({ message: 'Like supprimé et Dislike ajouté !' }) })
                            .catch(error => res.status(400).json({ error }))
        }
        else ( Comment.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } })
        .then((comment) => res.status(200).json({ message: 'Dislike ajouté !' }))
        .catch(error => res.status(400).json({ error })) )

     }     
        
})
.catch(error => res.status(400).json({ error }))



    
      
      
    





}












