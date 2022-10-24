import './Comments.css'
import { useContext, useEffect, useState } from 'react';
import {AuthContext} from "../../contexts/AuthContext";
import {modifyOneComment} from "../../services/CommentApi"
import { getItem } from '../../services/LocaleStorage'
import axios from 'axios'
import { Link } from 'react-router-dom';


function Comments (props){
const {auth} = useContext(AuthContext);  

///  CONSTANTES UTILISEES POUR CONTROLER SI l'USER A DEJA LIKE OU DISLIKE AFIN D'AFFICHER LES BONNES INFOS///

const isUserAlreadyLike = props.usersLiked.find(element => element == auth.userId )
const isUserAlreadyDislike = props.usersDisliked.find(element => element == auth.userId )

/// MODALE DE SUPPRESSION ///

const [modalDelete, setModalDelete] = useState(false)
const toggleModalDelete = () => {
    setModalDelete(!modalDelete)
}


/////////// EDITION D'UNE PUBLICATION //////////////
const formDataEdition = new FormData();
const [commentModification, setCommentModification] = useState({commentTxt : props.txt})
const [commentImageModification, setCommentImageModification] = useState()
const [previewImg, setPreviewImg] = useState ({imageUrl : props.imageUrl,
isImage : props.isImage })

/*
console.log("//// commentModification /////")
console.log(commentModification)
console.log("//// commentModification // END///")
*/

/// MODALE D'EDITION ///

const [modalModify, setModalModify] = useState(false)
const [modalImgModifyPreview, setModalImgModifyPreview] = useState(props.isImage)

const toggleModalModify = () => {
    setModalModify(!modalModify);
    setPreviewImg({imageUrl : props.imageUrl, isImage : props.isImage})
    setModalImgModifyPreview(props.isImage)
    setCommentModification({commentTxt : props.txt})
    setCommentImageModification()   
}


/// fonction d'édition ///

const handleChange =  event => {      
        setCommentModification({
          ...commentModification,
          [event.target.name]: event.target.value
        });
 }  

 const fileHandleChange =  event => {      
    setCommentImageModification(event.target.files[0])
    setPreviewImg({imageUrl : window.URL.createObjectURL(event.target.files[0])})
    setModalImgModifyPreview(true)
    
    console.log(" -> on passe la modale de preview sur true pour l'afficher")
    console.log(event.target.value)
    console.log(" -> On met l'url dans la preview")

}  

const deleteModifyImg = event => {
    console.log("On delete l'image")
    setModalImgModifyPreview(false)
    setCommentImageModification({})
    setCommentModification({imageUrl: "", isImage : false, commentTxt : commentModification.commentTxt,
})

    console.log(commentImageModification)
    console.log(" -> On vire la modal de preview")
    console.log(" -> On setCommentImageModification pour dire qu'il n'y a plus d'image")
    console.log(" -> On setCommentModification pour changer imageUrl")   

}

const submitCommentModify = event => { 
    event.preventDefault(); 

    formDataEdition.append ("comment", JSON.stringify(commentModification)  )
    formDataEdition.append("image", commentImageModification);    
      console.log("formDataEdition.getKEY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        for (var key of formDataEdition.keys()) {
          console.log(key);
       }
       /*
       console.log("formDataEdition.getAll()")
       console.log(formDataEdition.getAll("image"))
       co-nsole.log("formDataEdition.getAll()")
       console.log("formDataEdition.getAll()")
        console.log(formDataEdition.getAll("comment"))
        console.log("formDataEdition.getAll()")
        console.log("formDataEdition.getKEY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        modifyOneComment(props.id, formDataEdition)
        */
 }  


//// Reccupération des informations utilisateurs de manière dynamique ////

const [getUser, setGetUser] = useState ({});
const [isStillUser, setIsStillUser] = useState (true);   

 useEffect(() => {

    if (auth.isLogin ===false) { console.log("is login false")}

    else {

        function getOneUser() {
            const token = getItem('key_token');
           
            const config = {
                headers : { Authorization: `Bearer ${token}`}
            };
            return axios
            .get(`http://localhost:8000/api/auth/${props.userId}`, config)
            .then(response => { 
                /*
                console.log("response.data")
                console.log(response.data)
                console.log("response.data")
                */
                if ( response.data == null) { console.log("Si l'ID est une ID valide mais que l'utilisateur n'existe plus")
                setIsStillUser(false) 
            }
                else { setGetUser( response.data ) }
                         
             }) 
            .catch (error => { console.log(error)
                
            })  
        }
        getOneUser()
    }
    
/* 
console.log("getUser")
console.log(getUser)
console.log("getUser")
*/
    
}, [])
    return (
        <>
            <li className="comment__container"> 
                <div className="comment__profil">
                {
                            ( !isStillUser   && (
                                <>
                                    <img src="http://localhost:8000/images/default/avatardefault.png" className="comment__profil--avatar" alt="logo Groupomania" />
                                </>
                            )
                            ||
                            ( 
                                <>
                                <Link to={`/profile/${getUser._id}`}>            
                                <img src={getUser.avatar} className="comment__profil--avatar" alt="logo Groupomania" />
                                </Link>
                                </> )

                            ) 
                }
                    <div className="comment__profil--name">
                    {
                            ( !isStillUser   && (
                                <>
                                {props.firstname} {props.lastname} (Utilisateur supprimé)
                                </>
                            )
                            ||
                            ( 
                                <>
                                <Link to={`/profile/${getUser._id}`}>            
                                    {getUser.firstname} {getUser.lastname}
                                </Link>
                                </> 
                            )
                            ) 
                        } a écrit :
                    </div>
                    <div className ="comment__profil--button">  
                        {
                            ( ((props.userId == auth.userId) || (auth.isAdmin === true ) ) && (
                                <>
                                <button aria-label="Supprimer cette publication" onClick={toggleModalDelete}><i className="fas fa-trash-alt"></i></button>
                                <button aria-label="Modifier cette publication" onClick={toggleModalModify}><i className="fas fa-cogs"></i></button>
                                </>
                            )) 
                        } 
                    </div>
                </div>
                <div className="comment__intro"></div>
                <div className="comment__base">   
                    {(props.isImage === true) && ( <img className="comment__base--img"
                    src={props.imageUrl}
                    alt="Publication de Prénom et Nom"                     
                    />  )
                    }                      
                    <div className="comment__base--txt">
                        {props.txt}
                    </div>
                    <div className="base__likeordislike">
                        <div aria-label="Liker cette publication" className=
                        {
                            (isUserAlreadyLike !== undefined  && (
                                "base__likeordislike--like liked"
                            )) 
                            ||
                            (                        
                                "base__likeordislike--like"   
                            ) 
                        }        
                        >           
                            <p>{props.likes}</p>
                            <i className="fas fa-thumbs-up" onClick={() => props.likeFunction(props.id, props.likes, props.dislikes, props.usersLiked, props.usersDisliked)} ></i>
                        </div>
                        <div aria-label="Disliker cette publication" className=
                            {
                                (isUserAlreadyDislike !== undefined  && (
                                    "base__likeordislike--like disliked"
                                )) 
                                ||
                                (                        
                                    "base__likeordislike--like"   
                                ) 
                            }
                            >    
                                <i className="fas fa-thumbs-down" onClick={() => props.dislikeFunction(props.id, props.likes, props.dislikes, props.usersLiked, props.usersDisliked)}></i>
                            <   p>{props.dislikes}</p>
                        </div>
                    </div>                  
                    <div className="comment__base--end"></div>
                </div>
            </li>
            { modalDelete &&
            <div className="modal__overlay">
                        <div className="modal__body">
                            <div className="modal__title">
                                <h2>Attention ! </h2>
                            </div>
                            <div className="modal__style"></div>
                            <div className="modal__warning">Vous vous apprêtez à supprimer une publication. Cette action est irréversible. Confirmer la suppression ou annuler et revenez au fil d'actualité.</div>
                            <div>
                                <button className="modal__cancel" onClick={toggleModalDelete}>Annuler</button>
                                <button className="modal__delete" onClick={() => props.delFunction(props.id)}>Supprimer</button>
                            </div>
                        </div>
            </div> }
            { modalModify &&
            <div className="modal__overlay">
                        <div className="modal__body">
                            <div className="modal__title">
                                <h2> Modifier la publication </h2>
                            </div>
                            <div className="modal__style"></div>
                            <form className ="modifycomment__form" onSubmit={submitCommentModify}>
                                <label htmlFor="commentTxt">
                                    <i className="far fa-comment fa-2x"></i>
                                </label>
                                <textarea className="modal__form--inputcommenttxt" type='text' id="commentTxt" name="commentTxt" placeholder={commentModification.commentTxt}
                                onChange={handleChange}> 
                                </textarea>
                                

                                { (modalImgModifyPreview && 
                                    (<div className="modifycomment__preview">
                                        <img src={previewImg.imageUrl} alt="Aperçu de votre choix d'image" />
                                        <p>Aperçu</p>
                                        <div className="modifycomment__preview--overlay"></div>
                                        <div className="button__container">

                                        <label className="button__container--btn" htmlFor="newmodifyimage" >
                                        MODIFIER
                                       </label>    
                                        <input type='file' id="newmodifyimage" name="newmodifyimage" accept="image/png, image/jpeg" 
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
                                      <label className='modifyImageLabel' htmlFor="image">
                                            <i className="fas fa-plus" aria-label='Ajouter une image'></i>
                                      </label>
                                      <input type='file' id="image" name="image" accept="image/png, image/jpeg" 
                                      onChange={fileHandleChange} > 
                                      </input>
                                    </>
                                    )  
                                }    
                                <div>
                                    <div className="modal__cancel" onClick={toggleModalModify}>Annuler</div>
                                    <button className="modal__confirmedition">Confirmer l'édition</button>
                                </div>
                            </form>


                            
                        </div>
            </div> 
            }            
        </>
    )
}

export default Comments;



