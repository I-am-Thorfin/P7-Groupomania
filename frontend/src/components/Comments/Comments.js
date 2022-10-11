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
            <i className="fas fa-thumbs-up" onClick={() => props.likeFunction(props.id, props.likes, props.dislikes, props.usersLikes)}></i>
            
        </div>
        <div className="base__likeordislike--dislike">
            
            <i className="fas fa-thumbs-down" onClick={() => props.dislikeFunction(props.id)}></i>
            <p>{props.dislikes}</p>
        </div>
    </div>
    <div className="comment__base--end">                   
    </div>
    
</div>


</li>

        </div>
      
    
    
     /*   <li className="comment__container">

            


        <div className="comment__profil">
            <img src={avatar} className="comment__profil--avatar" alt="logo Groupomania" />
            <div className="comment__profil--name">
                
                
        
        </div>
            <div className ="comment__profil--button">  
                <i className="fas fa-trash-alt"></i>
                <i className="fas fa-cogs"></i>
            </div>
            
        </div>
        <div className="comment__intro"></div>
            <div className="comment__base">   
                <img className="comment__base--img"
                   src={photo}
                   alt="Publication de Prénom et Nom"                     
                   />    
                <div className="comment__base--txt">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec blandit, nibh et elementum iaculis, enim ex aliquam nibh, sed lobortis nulla risus in sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla ut lorem id nunc consectetur blandit eu a mauris. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam ultricies quam id leo rutrum, in dictum tellus rutrum. Aenean pulvinar ipsum augue, quis sodales massa varius et. Nam consectetur elit orci, eget fermentum lacus pretium ut. Maecenas luctus eros lorem, sit amet ultrices nibh posuere in. Donec pellentesque aliquet purus a pharetra. Phasellus fermentum velit ex, fringilla porta massa accumsan pharetra.

                Aliquam at commodo nunc. Fusce non dolor turpis. Etiam vulputate, mauris feugiat commodo sagittis, eros enim gravida nisi, id fringilla nulla sem id nisl. Integer quis tortor ac turpis consectetur congue sit amet ac lorem. Nullam gravida gravida est sit amet pulvinar. Suspendisse porttitor elit eros, eget ultrices enim luctus ac. Aenean faucibus venenatis bibendum. Aenean id lobortis urna.

                Morbi lorem enim, faucibus et mi at, vulputate suscipit nisi. Curabitur condimentum quam massa, a sollicitudin orci hendrerit eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In vel sapien velit. Proin in sagittis urna, eget finibus est. Proin tempor sit amet est a pulvinar. Vivamus dictum risus vel faucibus malesuada. Suspendisse sit amet tortor sit amet magna sodales pulvinar a ac velit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla facilisi. Mauris vulputate lorem ac diam facilisis, id dictum nunc ullamcorper. Mauris a cursus elit. Nam vitae orci rhoncus, scelerisque nisl a, bibendum orci. Nullam gravida dolor sit amet metus sollicitudin, a mollis est hendrerit.

                Nam mollis erat sit amet faucibus maximus. Aenean odio ex, elementum et tempor et, auctor vel est. Nam scelerisque malesuada turpis, a ullamcorper ante congue molestie. Cras luctus dui in commodo imperdiet. Quisque lacinia ante dolor, a cursus nulla fringilla pellentesque. Nunc magna tellus, vestibulum at pretium nec, tincidunt vel lectus. Morbi lacinia arcu ut mi convallis, vel fermentum urna euismod. Maecenas varius varius sapien, eu tincidunt eros condimentum et. Praesent nec varius dolor, volutpat imperdiet nibh.

                Nam blandit auctor lorem, in sagittis risus dignissim id. Proin nec dignissim ex, ut feugiat urna. Sed posuere tincidunt metus, ut posuere magna egestas vel. Phasellus sit amet tincidunt lacus. Integer sit amet luctus nisl. Sed pharetra, ex at scelerisque vehicula, nulla libero gravida elit, mollis mollis sapien nisl at ipsum. Maecenas ac luctus odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;

                Vestibulum ullamcorper volutpat accumsan. Nulla facilisi. Maecenas ex ligula, rhoncus in vestibulum at, porta et nisl. Morbi ullamcorper, mauris ut eleifend lacinia, urna magna ornare eros, efficitur tincidunt mi lectus eu urna. Vivamus aliquam placerat tortor eu semper. Proin et felis volutpat, blandit lectus a, pharetra mauris. Proin sodales turpis quis velit blandit, eu auctor tellus efficitur. Nam sit amet metus libero. Quisque cursus ut ante quis ornare.
            </div>
            <div className="base__likeordislike">
                <div className="base__likeordislike--like">
                    
                    <p>1</p>
                    <i className="fas fa-thumbs-up"></i>
                    
                </div>
                <div className="base__likeordislike--dislike">
                    
                    <i className="fas fa-thumbs-down"></i>
                    <p>2</p>
                </div>
            </div>
            <div className="comment__base--end">                   
            </div>
            
        </div>

        
    </li>*/
    
    
        )

}

export default Comments;



/*{
    (props.userId !== auth.userId && (
        <>
        </>
    )) 
    ||
    (
        <>
            <button onClick={() => props.delFunction(props.id)}><i className="fas fa-trash-alt"></i></button>
            <button><i className="fas fa-cogs"></i></button>
        </>
    ) 
} */