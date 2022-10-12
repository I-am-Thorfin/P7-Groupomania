import './Comments.css'
import avatar from './roll-safe-meme-1.jpg';
import photo from './forettest.jpeg'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { getItem } from '../../services/LocaleStorage'
import {AuthContext} from "../../contexts/AuthContext"
 



function Comments (props){

const {auth} = useContext(AuthContext);  

    // PENSEZ A LA KEY DANS LES LISTES AVEC MAP()

    return (

        <div>

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
                  <button onClick={() => props.delFunction(props.id)}><i className="fas fa-trash-alt"></i></button>
                  <button><i className="fas fa-cogs"></i></button>
                </>
            )) 
             
        } 
        
    </div>
    
</div>
<div className="comment__intro"></div>
    <div className="comment__base">   
        <img className="comment__base--img"
           src={photo}
           alt="Publication de Prénom et Nom"                     
           />    
        <div className="comment__base--txt">
       {props.txt}
    </div>
    <div className="base__likeordislike">
        <div className="base__likeordislike--like">
            
            <p>{props.likes}</p>
            <i className="fas fa-thumbs-up" onClick={() => props.likeFunction(props.id, props.likes, props.dislikes, props.usersLiked, props.usersDisliked)} ></i>
            
        </div>
        <div className="base__likeordislike--dislike">
            
            <i className="fas fa-thumbs-down" onClick={() => props.dislikeFunction(props.id, props.likes, props.dislikes, props.usersLiked, props.usersDisliked)}></i>
            <p>{props.dislikes}</p>
        </div>
    </div>
    <div className="comment__base--end">                   
    </div>
    
</div>


</li>

        </div>
      
    
    
     
    
    
        )

}

export default Comments;



