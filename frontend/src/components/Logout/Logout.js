import React, {useContext} from 'react'
import { logout } from '../../services/AuthApi'
import {AuthContext} from "../../contexts/AuthContext"


function Logout (){
    const {auth, setAuth} = useContext(AuthContext); 

    

    const handleLogout = (event) => {
       console.log('hello there')

       logout();
       setAuth ({isLogin : false});
      }

    return (
        <div>
            <i className="fas fa-sign-out-alt"></i>
            <p onClick={handleLogout}>Logout</p>
        </div>
    )

}

export default Logout;