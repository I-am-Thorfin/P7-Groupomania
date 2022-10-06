import './Addcomments.css'
import { useState, useContext } from 'react';
import {AuthContext} from "../../contexts/AuthContext"
import { createNewComment } from '../../services/AuthApi'


function AddComments (){

  const {auth, setAuth} = useContext(AuthContext);

     

    const [stateAddCommentForm, setStateAddCommentForm] = useState({
        userId : auth.userId,
        commentTxt : "",
        imageUrl :""
    });

    //const handleChange1 = (event) => {
      //  setstateAddCommentForm({
        //  ...stateAddCommentForm,
         // [event.target.id]: event.target.value
        //});
     // }
    
      const handleChange = ({currentTarget}) => {

        const {name, value} = currentTarget;
        console.log(name, value)
        setStateAddCommentForm({...stateAddCommentForm, [name]: value})
    }  

       
    
      const handleSubmit = async event => {      
        event.preventDefault();       

        try { 
          const response = await createNewComment ();
          console.log(response)
          console.log("Commentaire posté !")           
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
                    <input type='file' id="imageUrl" name="imageUrl" accept="image/png, image/jpeg" 
                    onChange={handleChange} > 
                    </input>
                    
                    <button>Envoyer</button>
                </form>
            </div>
        
        </div>
    )

}

export default AddComments;