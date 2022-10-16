import { getItem, addItem, removeItem } from './LocaleStorage'
import axios from 'axios'
import jwtDecode from 'jwt-decode'


export function getAllComments(setState) {
    const token = getItem('key_token');
   
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    };

    return axios
    .get(`http://localhost:8000/api/comments`, config)
    .then(response => {  
      setState( response.data )          
     }) 
     .catch (error => (console.log(error))) 
  }

  export function modifyOneComment(commentId, formdata) {

    const token = getItem('key_token');
   
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    };

    return axios
    .put(`http://localhost:8000/api/comments/${commentId}`, formdata ,config)
    .then(response => {  console.log( response.data ) 
                 
     }) 
    .then( window.location.reload()  ) 
    .catch (error => (console.log(error))) 

  }


export function createNewComment(ourForm) {
    const token = getItem('key_token');
    
    const config = {
        headers : { Authorization: `Bearer ${token}`,
        "Content-Type" : "multipart/form-data; boundary=something"
        }
    };

    return axios
    .post(`http://localhost:8000/api/comments`, ourForm, config)
    
    .then(response => console.log(response.data)
        )
    .then( window.location.reload()  ) 

    .catch( error => console.log(error));
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
    .then( console.log("Like or Dislike send ! "))
    
    .catch ( error => console.log(error));
}