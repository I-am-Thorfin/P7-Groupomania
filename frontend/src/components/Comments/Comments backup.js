import './Comments.css'
import avatar from './roll-safe-meme-1.jpg';
import photo from './forettest.jpeg'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { getItem } from '../../services/LocaleStorage'
import {AuthContext} from "../../contexts/AuthContext"



function Comments (){

    const {auth, setAuth} = useContext(AuthContext);
    const [getComment, setGetComment] = useState ( [{
        
    }]
    );


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
                setGetComment( response.data )          
             })  
            .catch (error => console.log(error)) 
        }
        getComment()}

        
    }, [])

    console.log(getComment)

    const commentList = getComment

    console.log(commentList)

    const handleDislike = (e) => {
        console.log(`From handleDislike sur le dislike`)
    }

    const handleLike = (e) => {

        console.log(`From handleLike sur le dislike`)

    }


    // PENSEZ A LA KEY DANS LES LISTES AVEC MAP()

    return (
<ul>
    {
    commentList.map( commentList => (
        <li key={commentList._id} className="comment__container">
            <div className="comment__profil">
                <div className="comment__profil--name">
                {commentList.userfirstname} {commentList.userlastname} a écrit :
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
                    {commentList.commentTxt}
                </div>    
                <div className="base__likeordislike">
                <div className="base__likeordislike--like">
                    
                    {commentList.likes}
                    <i className="fas fa-thumbs-up" onClick={handleLike}></i>
                    
                </div>
                <div className="base__likeordislike--dislike">
                    
                    <i className="fas fa-thumbs-down " onClick={handleDislike}></i>
                    {commentList.dislikes}
                </div>
            </div>
            <div className="comment__base--end">                   
            </div>   
            </div>

            
            
        </li>    
                

                
                
                
                 
    ))
    }

</ul>
        
    
    
     /*   <div className="comment__container">

            


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

        
    </div>*/
    
    
        )

}

export default Comments;