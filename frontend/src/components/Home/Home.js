import './Home.css'
import { useState, useContext, useEffect, isValidElement } from 'react';
import {AuthContext} from "../../contexts/AuthContext"
import { createNewComment, FuncLikeOrDislike, getAllComments } from '../../services/CommentApi'
import Comments from '../Comments/Comments';
import AddComment from '../Comments/AddComment';
import axios from 'axios'
import { getItem } from '../../services/LocaleStorage'
import { Navigate } from 'react-router-dom';

function AddComments (){

  const {auth, setAuth} = useContext(AuthContext);  
  const [ stateCommentsList, setStateCommentsList] = useState([])
  const [ watchForLike, setWatchForLike] = useState(1)

  

  ///////////// FONCTION DE RECCUPERATION DES COMMENTAIRE DEPUIS L'API  /////////////
  ///APPEL DE LA FONCTION DE RECCUPERATION///
  useEffect(() => {

    if (auth.isLogin ===false) { console.log("is login false")}
    else {
      getAllComments(setStateCommentsList) 
  }   
  }, 
  [watchForLike])
  
  const [stateAddCommentForm, setStateAddCommentForm] = useState({
        userId : auth.userId,
        commentTxt : "",
        userlastname : auth.lastname,
        userfirstname :auth.firstname
  });

    const handleChange = (event) => {
      setStateAddCommentForm({
        ...stateAddCommentForm,
        [event.target.id]: event.target.value
      });
    } 

   const fileHandleChange = (event) => {

  /*    console.log("StateaddcommentForm :") 
      console.log(event.target.files[0])
      console.log("StateaddcommentForm END///")
  */
      setStateAddCommentForm ({...stateAddCommentForm, [event.target.id]: event.target.files[0]})
    }
      const handleSubmit = async event => {      
        event.preventDefault();       

        try { 
          const response = await createNewComment(stateAddCommentForm);
          console.log(response);
          console.log("Commentaire posté !")  
          window.location.reload()          
         } catch(error) {
           console.log(error)
         }
       } 
    //END/////////// FONCTION D'AJOUT D'UN COMMENTAIRE  ///////////END//     

    ///////////// FONCTION DE SUPPRESSION D'UN COMMENTAIRE :   /////////////
    
    const deleteElement = id => {
      // console.log(id)
      
      const filteredStateComment = stateCommentsList.filter( comment => {
        return comment.id !== id;
      })
      setStateCommentsList (filteredStateComment)


      function deleteComment() {
        const token = getItem('key_token');
       
        const config = {
            headers : { Authorization: `Bearer ${token}`}
        };
    
        return axios
        .delete(`http://localhost:8000/api/comments/${id}`, config)
        .then(response => { 
          console.log(response) 
          const filteredStateComment = stateCommentsList.filter( comment => {
            return comment._id !== id;
          })
          setStateCommentsList (filteredStateComment)
          console.log("Le commentaire a bien été supprimé")              
         })
         .catch (error => (console.log(error)))      
    }
    deleteComment()  

    }
    //END/////////// FONCTION DE SUPPRESSION D'UN COMMENTAIRE :   ///////////END//
    ///////////// FONCTION DE LIKE  /////////////
    
       const likeElement = async ( id) => {
    
        const data = {userId : auth.userId,
        like : 1}    

        try { 
          const response = await FuncLikeOrDislike(id, data);
          console.log(response);
          setWatchForLike( watchForLike+1)          
         } catch(error) {
           console.log(error)
         }     
    }

    const dislikeElement = async (id) => {

      const data = {userId : auth.userId,
        like : -1}    

        try { 
          const response = await FuncLikeOrDislike(id, data);
          console.log(response);  
          setWatchForLike( watchForLike-1 )          
         } catch(error) {
           console.log(error)
         } 
    }

    //END/////////// FONCTION DE LIKE  ///////////END//
  
  /*
  console.log("///// stateCommentsList /////")
  console.log(stateCommentsList)
  console.log("///// stateCommentsList /////")
  */
  /*
  console.log("auth")
  console.log(auth)
  console.log("auth")
  */
  return (
    <>  
         {!auth.isLogin && <Navigate to="/login" />}

         

        < AddComment/>

        <ul className='list_Comment' >

          {
          stateCommentsList.slice(0).reverse().map(comment => {
            return (
              < Comments
              id= {comment._id} // id devient notre référence pour l'ID du commentaire
              userId = {comment.userId} 
              imageUrl= {comment.imageUrl}
              isImage = {comment.isImage}
              key={comment._id}  
              txt = {comment.commentTxt} 
              firstname = {comment.userfirstname}
              lastname = {comment.userlastname}  
              likes = {comment.likes}
              dislikes = {comment.dislikes}
              usersLiked = {comment.usersLiked}        
              usersDisliked = {comment.usersDisliked}
              delFunction ={deleteElement}
              likeFunction = {likeElement}
              dislikeFunction = {dislikeElement}
              />
            )
          })
          }
          
        </ul>
  </>
)
}
export default AddComments;