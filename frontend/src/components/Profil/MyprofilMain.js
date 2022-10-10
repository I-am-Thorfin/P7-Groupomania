import { useContext, useEffect, useState } from 'react';
import { AuthContext} from "../../contexts/AuthContext"
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { getItem } from '../../services/LocaleStorage'



function MyprofilMain (){

    const {auth, setAuth} = useContext(AuthContext);
    const params = useParams();
    const profilParamsId = params.id
    const [getUser, setGetUser] = useState ( {
        email : "",
        firstname : "",
        isadmin : false,
        lastname : "",
        password : "",
        __v : 0,
        _id : "",
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
            }
            getOneUser()
        }

        
    }, [])

  console.log(getUser)



  const profilUser = [getUser]
    






    return (

        <div className="Main__container">
            {
                profilUser.map( profilUser => (<h2>{profilUser._id}</h2>) ) 
            }

           
         
            <>
                {!auth.isLogin && <Navigate to="/login" />}
            </>
            <p>Composant Mon Profil</p>
        </div>
    )

}

export default MyprofilMain;