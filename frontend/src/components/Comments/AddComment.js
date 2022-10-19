import './AddComment.css'
import { useState, useContext } from 'react';
import {AuthContext} from "../../contexts/AuthContext"
import { createNewComment } from '../../services/CommentApi'


function AddComments (){

  const formData = new FormData();

  const {auth, setAuth} = useContext(AuthContext);

  const [stateAddCommentForm, setStateAddCommentForm] = useState({
    userId : auth.userId,
    commentTxt : "",
    userlastname : auth.lastname,
    userfirstname :auth.firstname,
    isImage : false
});

const [stateAddImage, setStateAddImage] = useState()

const [modalImgPreview, setModalImgPreview] = useState(false)
const [previewImg, setPreviewImg] = useState ({})

/*
console.log("stateAddImage !")
console.log(stateAddImage)
console.log("stateAddImage !")
*/

/*console.log("stateAddCommentForm")
console.log(stateAddCommentForm)
console.log("stateAddCommentForm")
*/

const deleteModifyImg = event => {
  setStateAddImage()
  setModalImgPreview(false)  
  setPreviewImg({})
}
  

const handleChange = (event) => {
  setStateAddCommentForm({
    ...stateAddCommentForm,
    [event.target.id]: event.target.value
  });     
} 
    
const fileHandleChange = (event) => {
  setStateAddImage(event.target.files[0])
  setPreviewImg({imageUrl : window.URL.createObjectURL(event.target.files[0])})
  setModalImgPreview(true)

}      
    
const handleSubmit = async event => {      
  event.preventDefault();   

  formData.append (  "comment", JSON.stringify(stateAddCommentForm)  )
  formData.append("image", stateAddImage);

        /*
        console.log("formData.getKEY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        for (var key of formData.keys()) {
          console.log(key);
        }
        console.log("formData.getAll()")
        console.log(formData.getAll("image"))
        console.log("formData.getAll()")
        console.log("formData.getAll()")
        console.log(formData.getAll("comment"))
        console.log("formData.getAll()")
        console.log("formData.getKEY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        */

    if (stateAddImage !== undefined ) {
          console.log("il y a une image à envoyer")
          try { 
          const response = await createNewComment(formData);
          console.log(response)   
                    
         } 
         catch(error) {
           console.log(error)
         }   
    }

    else {
        console.log("il n'y a pas d'images à envoyer")
        try { 
          const response = await createNewComment(formData);
          console.log(response)               
        } 
        catch(error) {
           console.log(error)
        }   
    }
};   

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
              <textarea className="addcomment__form--inputcommenttxt" type='text' id="commentTxt" name="commentTxt" placeholder="Ecrivez nous ici !"
              onChange={handleChange}> 
              </textarea>

              
              { (modalImgPreview && 
                                    (<div className="addcomment__preview">
                                        <img src={previewImg.imageUrl} alt="Aperçu de votre choix d'image" />
                                        <p>Aperçu</p>
                                        <div className="addcomment__preview--overlay"></div>
                                        <div className="button__container">

                                        <label className="button__container--btn" htmlFor="newimage" >
                                        MODIFIER
                                       </label>    
                                        <input type='file' id="newimage" name="newimage" accept="image/png, image/jpeg" 
                                        onChange={fileHandleChange} > 
                                        </input>
                                        <div className="button__container--btn" onClick={deleteModifyImg}> 
                                                SUPPRIMER
                                        </div>

                                        </div>
                                        
                                    </div>))
                                    ||
                                    (
                                    <>
                                      <label className='addImageLabel' htmlFor="image">
                                        <i className="fas fa-plus" aria-label='Ajouter une image'></i>
                                      </label>
                                      <input type='file' id="image" name="image" accept="image/png, image/jpeg" 
                                      onChange={fileHandleChange} > 
                                      </input>
                                    </>
                                    )  
                                }

              
              
              <button>Envoyer</button>
          </form>
      </div> 
  </div>
    )
}

export default AddComments;