import React, {useContext} from 'react'
import { logout } from '../../services/AuthApi'
import {AuthContext} from "../../contexts/AuthContext"


function Logout (){
    const {auth, setAuth} = useContext(AuthContext); 

    

    const handleLogout = async event => {
       console.log('hello there')
       
        await setAuth ({isLogin : false, isAdmin : false, 
                    userId : "",
                    lastname : "",
                    firstname : ""}) 

        logout();
        
      }

    return (
        <div>
            <i className="fas fa-sign-out-alt"></i>
            <p onClick={handleLogout}>Logout</p>
        </div>
    )

}

export default Logout;