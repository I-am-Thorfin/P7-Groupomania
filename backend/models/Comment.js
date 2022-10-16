const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    userId : { type: String, require : true},
    userfirstname : { type: String, require : true},
    userlastname : { type: String, require : true},
    commentTxt: {type: String, required: true},
    imageUrl: {type: String, required: false},
    isImage : {type: Boolean, required: false, default: false },
    likes: {type: Number, required: false, default: 0 },
    dislikes: {type: Number, required: false, default: 0 },
    usersLiked: {type: [String], required: false},
    usersDisliked: {type: [String], required: false},
});

module.exports = mongoose.model('Comment', commentSchema);

