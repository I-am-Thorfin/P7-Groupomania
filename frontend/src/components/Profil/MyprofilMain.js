import { useContext, useEffect, useState } from 'react';
import { AuthContext} from "../../contexts/AuthContext"
import { checkStorage } from '../../services/AuthApi';
import { Navigate, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { getItem } from '../../services/LocaleStorage'
import './MyProfilMain.css'
import { logout, modifyOneUser } from "../../services/AuthApi"




function MyprofilMain (){
    

    const {auth, setAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    // On s'assure de la connexion en arrivant ici :
    checkStorage(setAuth)

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
                    console.log("response.data")
                    console.log(response.data)
                    console.log("response.data")
                    if ( response.data == null) { navigate("/userunfound")}
                    else {setGetUser( response.data ) }
                             
                 }) 
                .catch (error => { console.log(error)
                    navigate("/userunfound")
                })  
            }
            getOneUser()
        }

        
    }, [])


    console.log(getUser)


    

  //END/////////// FONCTION DE RECCUPERATION D'UN USER EN FONCTION DE L'ID DANS L'URL  ///////////END//


  ///////////// FONCTION DE SUPPRESSION DU COMPTE  /////////////
  

  const delUserFunction = (event) => {

    
    const token = getItem('key_token');
   
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    };

    return axios
    .delete(`http://localhost:8000/api/auth/${profilParamsId}`, config)
    .then(response => {  console.log(response)
        if (auth.userId === profilParamsId) { logout()
            navigate("/home")
         } 
        else { navigate("/home")  }                
     }) 
    .catch (error => { console.log(error)}) 
}

//END/////////// FONCTION DE SUPPRESSION DU COMPTE  ///////////END//

/////////// EDITION DU COMPTE //////////////

const formDataEdition = new FormData();
const [userModification, setUserModifications] = useState({})
const [userImageModification, setUserImageModifications] = useState()

/// MODALE D'EDITION ///

const [modalModify, setModalModify] = useState(false)

const toggleModalModify = () => {
    setModalModify(!modalModify)
}

////fonction d'édition////
const handleChange =  event => {      
    setUserModifications({
        ...userModification,
        [event.target.name]: event.target.value
      });
}  

console.log("userModification")
console.log(userModification)
console.log("userModification")

const fileHandleChange =  event => {      
    setUserImageModifications(event.target.files[0])
} 

console.log("userImageModification")
console.log(userImageModification)
console.log("userImageModification")



const submitUserModify = async event => { 
event.preventDefault(); 

formDataEdition.append ("user", JSON.stringify(userModification)  )
formDataEdition.append("image", userImageModification); 

    console.log("formDataEdition.getAll()")
    console.log(formDataEdition.getAll("image"))
    console.log("formDataEdition.getAll()")
    console.log("formDataEdition.getAll()")
    console.log(formDataEdition.getAll("user"))
    console.log("formDataEdition.getAll()")
    console.log("formDataEdition.getKEY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

    modifyOneUser(auth.userId, formDataEdition)
}  




    return (

        <div className="mainprofil__container">
            <div className='profil__container--titre'>
                {
                    (auth.userId === getUser._id  && (
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

                    <img src={getUser.avatar} className="profil__info--avatar" alt="logo Groupomania" />
                    <div className='profil__info--line'></div>
                    <div>
                        <p>Nom : </p> {getUser.lastname}
                    </div>
                    <div>
                        <p>Prénom : </p> {getUser.firstname}
                    </div>
                    <div className='profil__info--line'></div>
                </div>
                {
            ( ((getUser._id === auth.userId) || (auth.isAdmin === true ) ) && (
                <div className='profil__button'>
                  <button className="profil__button--delete" onClick={delUserFunction} > supprimer </button>
                  <button className="profil__button--edit" onClick={toggleModalModify} > Editer </button>
                </div>
            )) 
             
        } 


        { modalModify &&
            <div className="modal__overlay">
                        <div className="modal__body">
                            <div className="modal__title">
                                <h2> Modifier le profil </h2>
                            </div>
                            
                            <div className="modal__style"></div>
                            <form className ="mainprofilmodal__form" onSubmit={submitUserModify}>
                                <label htmlFor="lastname">
                                    Nom :
                                </label>
                                <input type='text' id="lastname" name="lastname" placeholder={getUser.lastname}
                                onChange={handleChange}> 
                                </input>
                                <label htmlFor="firstname">
                                    Prenom :
                                </label>
                                <input type='text' id="firstname" name="firstname" placeholder={getUser.firstname}
                                onChange={handleChange}> 
                                </input>
                                <label htmlFor="image">
                                <i className="fas fa-images"></i> Voulez-vous modifier votre photo de profil ?
                                </label>
                                <input type='file' id="image" name="image" accept="image/png, image/jpeg" 
                                onChange={fileHandleChange} > 
                                </input>
                                
                                <div className='profilmodal__button'>
                                    <div className="modal__cancel" onClick={toggleModalModify}>Annuler</div>
                                    <button className="modal__confirmedition">Confirmer l'édition</button>
                                </div>
                            </form>
                            
                            
                        </div>
            </div> }     

            

             



            

           
         
            <>
                {!auth.isLogin && <Navigate to="/login" />}
            </>
        </div>
    )

}

export default MyprofilMain;