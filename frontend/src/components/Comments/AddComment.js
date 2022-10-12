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

  



  ///////////// FONCTION DE RECCUPERATION DES COMMENTAIRE DEPUIS L'API  /////////////
  
  function getComment() {
    const token = getItem('key_token');
   
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    };

    return axios
    .get(`http://localhost:8000/api/comments`, config)
    .then(response => {  
      setStateCommentsList( response.data )          
     }) 
     .catch (error => (console.log(error))) 
}

  ///APPEL DE LA FONCTION DE RECCUPERATION///
  useEffect(() => {

    if (auth.isLogin ===false) { console.log("is login false")}
    else {
    getComment()  
  }   
  }, 
  [])
  //END/APPEL DE LA FONCTION DE RECCUPERATION/END//
  //END/////////// FONCTION DE RECCUPERATION DES COMMENTAIRE DEPUIS L'API  ///////////END//

  
  
  ///////////// FONCTION D'AJOUT D'UN COMMENTAIRE  /////////////
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
    //END/////////// FONCTION DE SUPPRESSION D'UN COMMENTAIRE :   ///////////END//

    ///////////// FONCTION DE LIKE  /////////////
    
    const [like, setLike] = useState()
    const [dislike, setDislike] = useState()

    const [likeActive, setLikeActive] = useState(false)
    const [dislikeActive, setDisklikeActive] = useState(false)

    const [commentLiked, setCommentLiked] = useState([]) 

    console.log("filterCommentstate 1")
        console.log(commentLiked)
        console.log("filterCommentstate END")


    // Y PENSER : POUR DEFINIR L'ETAT INITIAL ON DEVRA VERIFIER LA PRESENCE DE L'ID DANS LES TABLEAUX LIKE ET DISLIKE //
    console.log("////likeActive/////")
    console.log(likeActive)
    console.log("////likeActive/END/")

    const likeElement = (id, likes, dislikes, usersLiked, usersDisliked, userId, Txt ) => {

      /*const addtostateLiked = { 
        commentTxt : Txt,
        _id : id, 
        userId : userId,
        likes : likes,
      dislikes : dislikes,
    usersLiked : usersLiked,
  usersDisliked : usersDisliked}*/

  

      //console.log("ADDTOSTATELIKED")
      //console.log(addtostateLiked)
      //console.log("ADDTOSTATELIKED")

      const isUserAlreadyLike = usersLiked.find( element => element === auth.userId);
      const isUserAlreadyDislike = usersDisliked.find( disliked => disliked === auth.userId);

      


      

    

      console.log("FONCTION POUR LIKER !")
      console.log("ID :")
      console.log(id)
      console.log("ID //END")

      console.log("usersliked :")
      console.log(usersLiked)
      console.log("usersliked //END")

      console.log("usersdisliked :")
      console.log(usersDisliked)
      console.log("usersliked //END")
      
      console.log("likes :")
      console.log(likes)
      console.log("likes //END")

      console.log("dislikes :")
      console.log(dislikes)
      console.log("dislikes //END")

      console.log("found like :")
      console.log(isUserAlreadyLike)
      console.log("found //END")

      console.log("found dislike :")
      console.log(isUserAlreadyDislike)
      console.log("found //END")

      

      if (isUserAlreadyLike !== undefined) { 

        console.log("L'utilisateur a déjà liké")
        console.log("---> On retire le like") 

       

 
       
         
       





        

    }

      else if (isUserAlreadyDislike !== undefined) { console.log("L'utilisateur a déjà disliké")
      console.log("---> On retire le dislike ")
      console.log("---> On ajoute le like ")
      
        



     }

      else { console.log("--->On ajoute le like")

       
      


    }

    }

    const dislikeElement = (id, likes, dislikes, usersLiked, usersDisliked ) => {

      const isUserAlreadyLike = usersLiked.find( element => element === auth.userId);
      const isUserAlreadyDislike = usersDisliked.find( disliked => disliked === auth.userId);
      

      if (isUserAlreadyDislike !== undefined) { 
        console.log("L'utilisateur a déjà disliké") 
        console.log(" ---> Supprimer le dislike")
        
        
        
      console.log("found dislike :")
      console.log(isUserAlreadyDislike)
      console.log("found //END")


    }

      else if (isUserAlreadyLike !== undefined) { console.log("L'utilisateur a déjà liké") 
      console.log("---> On retire le like ")
      console.log("---> On ajoute le dislike ")
    
    
    }

      else ( console.log("---> On ajoute le dislike "))


    }

    //END/////////// FONCTION DE LIKE  ///////////END//

    console.log("///// stateCommentsList /////")
  console.log(stateCommentsList)
  console.log("///// stateCommentsList /////")
  
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
          stateCommentsList.map(comment => {
            return (
              < Comments
              id= {comment._id} // id devient notre référence pour l'ID du commentaire
              userId = {comment.userId} 
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
</div>

)

}

export default AddComments;