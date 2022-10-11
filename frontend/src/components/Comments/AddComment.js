import './Addcomments.css'
import { useState, useContext, useEffect, isValidElement } from 'react';
import {AuthContext} from "../../contexts/AuthContext"
import { createNewComment } from '../../services/AuthApi'
import Comments from './Comments';
import axios from 'axios'
import { getItem } from '../../services/LocaleStorage'


function AddComments (){
  
  const {auth, setAuth} = useContext(AuthContext);

  const [ stateCommentsList, setStateCommentsList] = useState([])


  useEffect(() => {

    if (auth.isLogin ===false) { console.log("is login false")}

    else {function getComment() {
        const token = getItem('key_token');
       
        const config = {
            headers : { Authorization: `Bearer ${token}`}
        };
    
        return axios
        .get(`http://localhost:8000/api/comments`, config)
        .then(response => {  
          setStateCommentsList( response.data )          
         })  
    }
    getComment()}

    
}, [])

     

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

      console.log("StateaddcommentForm :") 
      console.log(event.target.files[0])
      console.log("StateaddcommentForm END///")

      setStateAddCommentForm ({...stateAddCommentForm, [event.target.id]: event.target.files[0]})
    }
    
    console.log("StateaddcommentForm :")
    console.log(stateAddCommentForm)
    console.log("StateaddcommentForm END ///")

    console.log("///// stateCommentsList ////")
    console.log(stateCommentsList)
    console.log("//// stateCommentsList ////")
  
    
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



    // Fonction de suppression d'un commentaire : 
    
    const deleteElement = id => {
      console.log(id)
      
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

    // Fonction Like et Dislike
    const likeElement = (id, likes, dislikes, usersLikes ) => {

      const found = 

      console.log("Fonction pour liker !")
      console.log("ID :")
      console.log(id)
      console.log("ID //END")

      console.log("userslikes :")
      console.log(usersLikes)
      console.log("userslikes //END")

     

      console.log("likes :")
      console.log(likes)
      console.log("likes //END")

      console.log("dislikes :")
      console.log(dislikes)
      console.log("dislikes //END")

      



    }

    const dislikeElement = id => {

      console.log("Fonction pour disliker")
      console.log(id)

    }





    return (
<div>
        <h2>Ajout d'un commentaire :</h2>
        <div className="addcomment__container">
            <div className="addcomment__intro">
                <p>Vous souhaitez partager quelque chose ?</p>
            </div>
            <div className="addcomment__style"></div>

            <div className="addcomment_baseform">
                <form className ="addcomment__form" onSubmit={handleSubmit}>
                    <label htmlFor="commentTxt">
                       <i className="far fa-comment fa-2x"></i>
                    </label>
                    <input type='text' id="commentTxt" name="commentTxt" placeholder="Ecrivez nous ici !"
                    onChange={handleChange}> 
                    </input>
                    <label htmlFor="imageUrl">
                    <i className="fas fa-images"></i> Une photo à nous partager ?
                    </label>
                    <input type='file' id="imageUrl" name="imageUrl" accept="image/png, image/jpeg" 
                    onChange={fileHandleChange} > 
                    </input>
                    
                    <button>Envoyer</button>
                </form>
            </div> 
        </div>
        <h2>Liste des commentaires</h2>
        
        <ul>

          {
          stateCommentsList.map((comment, index) => {
            return (
              < Comments
              id= {comment._id} // id devient notre référence pour l'ID du commentaire
              userId = {comment.userId} 
              key={index}   
              txt = {comment.commentTxt} 
              firstname = {comment.userfirstname}
              lastname = {comment.userlastname}  
              likes = {comment.likes}
              dislikes = {comment.dislikes}
              usersLikes = {comment.usersLikes}        
              usersDislikes = {comment.usersDislikes}
              delFunction ={deleteElement}
              likeFunction = {likeElement}
              dislikeFunction = {dislikeElement}
              />
            )


          })
          }
          
        </ul>
</div>

)

}

export default AddComments;