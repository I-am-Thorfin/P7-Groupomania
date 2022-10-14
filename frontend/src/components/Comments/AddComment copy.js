import './AddComment.css'
import { useState, useContext } from 'react';
import {AuthContext} from "../../contexts/AuthContext"
import { createNewComment } from '../../services/AuthApi'




function AddComments (){

  const {auth, setAuth} = useContext(AuthContext);




     

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

       
    
      const handleSubmit = async event => {      
        event.preventDefault();       

        try { 
          const response = await createNewComment(stateAddCommentForm);
          console.log("Commentaire posté !")  
          window.location.reload()          
         } catch(error) {
           console.log(error)
         }
   
   
         
   
       }   



    return (
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
                    <input type='file' id="image" name="image" accept="image/png, image/jpeg" 
                    onChange={fileHandleChange} > 
                    </input>
                    
                    <button>Envoyer</button>
                </form>
            </div>
        
        </div>
    )

}

export default AddComments;