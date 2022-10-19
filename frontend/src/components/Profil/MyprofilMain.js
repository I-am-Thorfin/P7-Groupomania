import { useContext, useEffect, useState } from 'react';
import { AuthContext} from "../../contexts/AuthContext"
import { Navigate, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { getItem } from '../../services/LocaleStorage'
import './MyProfilMain.css'
import { logout, modifyOneUser } from "../../services/AuthApi"




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
                   /*  
                    console.log("response.data")
                    console.log(response.data)
                    console.log("response.data")
                   */ 
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

//console.log(getUser)

//END/////////// FONCTION DE RECCUPERATION D'UN USER EN FONCTION DE L'ID DANS L'URL  ///////////END//


///// MODALE DE SUPPRESSION /////  

const [modalDelete, setModalDelete] = useState(false)
const toggleModalDelete = () => {
    setModalDelete(!modalDelete)
}

///// MODALE DE SUPPRESSION ///END//  
  
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
            setAuth ({isLogin : false, isAdmin : false, 
                userId : "",
                lastname : "",
                firstname : ""}) 
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
    setModalCHeckProfileImg(false)
    setUserImageModifications({})
    setUserModifications({})

}

////fonction d'édition////
const handleChange =  event => {      
    setUserModifications({
        ...userModification,
        [event.target.name]: event.target.value
      });
}  
/*
console.log("userModification")
console.log(userModification)
console.log("userModification")
*/
const fileHandleChange =  event => {      
    setUserImageModifications(event.target.files[0])
} 

/*
console.log("userImageModification")
console.log(userImageModification)
console.log("userImageModification")
*/


const submitUserModify = async event => { 
event.preventDefault(); 

formDataEdition.append ("user", JSON.stringify(userModification)  )
formDataEdition.append("image", userImageModification); 

/*
    console.log("formDataEdition.getKEY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log("formDataEdition.getAll(image)")
    console.log(formDataEdition.getAll("image"))
    console.log("formDataEdition.getAll(image) END")
    console.log("formDataEdition.getAll(USER)")
    console.log(formDataEdition.getAll("user"))
    console.log("formDataEdition.getAll(USEr) END")
    console.log("formDataEdition.getKEY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
*/

    modifyOneUser(auth.userId, formDataEdition)
}  

const userProfileAvatar = JSON.stringify(getUser.avatar)
console.log(userProfileAvatar)
const [previewProfilImg, setPreviewProfilImg] = useState()

const [modalCheckProfileImg, setModalCHeckProfileImg] = useState(false)







const addNewProfileImage =  event => {
    setModalCHeckProfileImg(true)
    setPreviewProfilImg({avatar : window.URL.createObjectURL(event.target.files[0])})
    setUserImageModifications(event.target.files[0])
}

const deleteNewProfileImage =  event => {
    setUserImageModifications({}) 
    setPreviewProfilImg({avatar : "http://localhost:8000/images/default/avatardefault.png",})
    setModalCHeckProfileImg(true)
    setUserModifications({
        ...userModification,
        avatar : "http://localhost:8000/images/default/avatardefault.png"
      });
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
                  <button className="profil__button--delete" onClick={toggleModalDelete} > supprimer </button>
                  <button className="profil__button--edit" onClick={toggleModalModify} > Editer </button>
                </div>
            )) 
             
        } 

        { modalDelete &&
            <div className="modal__overlay">
                        <div className="modal__body">
                            <div className="modal__title">
                                <h2>Attention ! </h2>
                            </div>
                            <div className="modal__style"></div>
                            <div className="modal__warning">Vous vous apprêtez à supprimer ce compte et cette action est irréversible. Voulez-vous réellement mener cette action à son terme ?</div>
                            <div>
                                <button className="modal__cancel" onClick={toggleModalDelete}>Annuler</button>
                                <button className="modal__delete" onClick={delUserFunction}>Supprimer</button>
                            </div>
                        </div>
            </div> 
        }


        { modalModify &&
            <div className="modal__overlay">
                        <div className="modal__body">
                            <div className="modal__title">
                                <h2> Modifier le profil </h2>
                            </div>
                            
                            <div className="modal__style"></div>



                               
                                    <div className="profil__preview">
                                    

                                    { (!modalCheckProfileImg && 
                                    (<img src={getUser.avatar} alt="Aperçu de votre choix d'image" />
                                    ))
                                    ||
                                    (
                                    <>
                                      <img src={previewProfilImg.avatar} alt="Aperçu de votre choix d'image" />
                                    </>
                                    )  
                                    }
                                       
                                        <p>Aperçu</p>
                                        <div className="profil__preview--overlay"></div>
                                        <div className="button__container">

                                        <label className="button__profilcontainer--btn" htmlFor="newprofilimage" >
                                        MODIFIER
                                       </label>    
                                        <input type='file' id="newprofilimage" name="newprofilimage" accept="image/png, image/jpeg" 
                                        onChange={addNewProfileImage} > 
                                        </input>
                                        <div className="button__profilcontainer--btn" onClick={deleteNewProfileImage}> 
                                                SUPPRIMER
                                        </div>

                                        </div>
                                        
                                    </div>
                                   

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