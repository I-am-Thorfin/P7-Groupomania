import './Comments.css'
import avatar from './roll-safe-meme-1.jpg';
import { useContext, useEffect, useState } from 'react';
import {AuthContext} from "../../contexts/AuthContext"
import {modifyOneComment} from "../../services/CommentApi"


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
const [commentModification, setCommentModifications] = useState({commentTxt : props.txt})
const [commentImageModification, setCommentImageModifications] = useState()

console.log(commentModification)

/// MODALE D'EDITION ///

const [modalModify, setModalModify] = useState(false)

const toggleModalModify = () => {
    setModalModify(!modalModify)
}
/// fonction d'édition ///

const handleChange =  event => {      
        setCommentModifications({
          ...commentModification,
          [event.target.name]: event.target.value
        });
 }  

 const fileHandleChange =  event => {      
    setCommentImageModifications(event.target.files[0])
}  

const submitCommentModify = async event => { 
    event.preventDefault(); 

    formDataEdition.append ("comment", JSON.stringify(commentModification)  )
    formDataEdition.append("image", commentImageModification);    
      console.log("formDataEdition.getKEY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        for (var key of formDataEdition.keys()) {
          console.log(key);
       }
       console.log("formDataEdition.getAll()")
       console.log(formDataEdition.getAll("image"))
       console.log("formDataEdition.getAll()")
       console.log("formDataEdition.getAll()")
        console.log(formDataEdition.getAll("comment"))
        console.log("formDataEdition.getAll()")
        console.log("formDataEdition.getKEY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        modifyOneComment(props.id, formDataEdition)
 }  

    return (

        <>

            <li className="comment__container"> 
                <div className="comment__profil">
                    <img src={avatar} className="comment__profil--avatar" alt="logo Groupomania" />
                    <div className="comment__profil--name">
                        {props.firstname} {props.lastname} a écrit :
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
                            <form className ="addcomment__form" onSubmit={submitCommentModify}>
                                <label htmlFor="commentTxt">
                                    <i className="far fa-comment fa-2x"></i>
                                </label>
                                <input type='text' id="commentTxt" name="commentTxt" placeholder={commentModification.commentTxt}
                                onChange={handleChange}> 
                                </input>
                                <label htmlFor="image">
                                <i className="fas fa-images"></i> Une photo à nous partager ?
                                </label>
                                <input type='file' id="image" name="image" accept="image/png, image/jpeg" 
                                onChange={fileHandleChange} > 
                                </input>
                                
                                <div>
                                    <div className="modal__cancel" onClick={toggleModalModify}>Annuler</div>
                                    <button className="modal__delete">Confirmer l'édition</button>
                                </div>
                            </form>


                            
                        </div>
            </div> }            
        </>
    )
}

export default Comments;



