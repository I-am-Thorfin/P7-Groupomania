import { getItem, addItem, removeItem } from './LocaleStorage'
import axios from 'axios'
import jwtDecode from 'jwt-decode'




export function createNewComment(Statedecreationdecommentaire) {
    const token = getItem('key_token');
    
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    };

    return axios
    .post(`http://localhost:8000/api/comments`, Statedecreationdecommentaire, config)
    
    .then(response => console.log(response.data)
        )
    .then( console.log("Commentaire posté"));
}


export function FuncLikeOrDislike(commentId, data) {
    const token = getItem('key_token');
    
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    };

    return axios
    .post(`http://localhost:8000/api/comments/${commentId}/like`, data ,config)
    
    .then(response => console.log(response.data)
        )
    .then( console.log("Like or Dislike send ! "));
}