import { useContext, useEffect, useState } from 'react';
import { AuthContext} from "../../contexts/AuthContext"
import { Navigate, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { getItem } from '../../services/LocaleStorage'
import './MyProfilMain.css'



function MyprofilMain (){
    

    const {auth, setAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    ///////////// FONCTION DE RECCUPERATION D'UN USER EN FONCTION DE L'ID DANS L'URL  /////////////

    const params = useParams();
    const profilParamsId = params.id
    const [getUser, setGetUser] = useState ( {
        
    }
    );
    
    

    

    useEffect(() => {

        if (auth.isLogin ===false) { console.log("is login false")}

        else {
            function getOneUser() {
                const token = getItem('key_token');
               
                const config = {
                    headers : { Authorization: `Bearer ${token}`}
                };
            
                return axios
                .get(`http://localhost:8000/api/auth/${profilParamsId}`, config)
                .then(response => {  
                    setGetUser( response.data )          
                 }) 
                .catch (error => { console.log(error)
                    navigate("/userunfound")
                })  
            }
            getOneUser()
        }

        
    }, [])

  console.log(getUser)



  const profilUser = [getUser]
    

  //END/////////// FONCTION DE RECCUPERATION D'UN USER EN FONCTION DE L'ID DANS L'URL  ///////////END//


  ///////////// FONCTION DE SUPPRESSION DU COMPTE  /////////////



  //END/////////// FONCTION DE SUPPRESSION DU COMPTE  ///////////END//
  

  const delUserFunction = (event) => {

    
    const token = getItem('key_token');
   
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    };

    return axios
    .delete(`http://localhost:8000/api/auth/${profilParamsId}`, config)
    .then(response => {  console.log(response)
        if (auth.userId === profilParamsId) { console.log("L'utilisateur a supprimé son profil" ) } 

                 
     }) 
    .catch (error => { console.log(error)}) 
  


}


    return (

        <div className="mainprofil__container">
            <div className='profil__container--titre'>
                {
                    (auth.userId == getUser._id  && (
                        <>
                            <p>Bienvenue sur votre profil {getUser.firstname}</p>
                        </>
                    )) 
                    ||
                    (
                        <>
                            Profil de {getUser.firstname} {getUser.lastname}
                        </>
                    ) 
                } 
            </div>
            <div className='profil__style'></div>

                <div className="profil__info">
                    <div>
                        <p>Nom : </p> {getUser.lastname}
                    </div>
                    <div>
                        <p>Prénom : </p> {getUser.firstname}
                    </div>
                </div>

                {
            ( ((getUser._id == auth.userId) || (auth.isAdmin === true ) ) && (
                <>
                  <button onClick={delUserFunction} > supprimer </button>
                </>
            )) 
             
        }     

            

             



            

           
         
            <>
                {!auth.isLogin && <Navigate to="/login" />}
            </>
        </div>
    )

}

export default MyprofilMain;