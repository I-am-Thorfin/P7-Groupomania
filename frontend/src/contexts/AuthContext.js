import React, {createContext, useState} from "react";
import { hasAuthenticated, controlAdmin, userIdFromToken, userLastNameFromToken, userFirstNameFromToken } from '../services/AuthApi'


export const AuthContext = createContext ();

const AuthContextProvider = props => {

    const [auth, setAuth] = useState({ 
        isLogin : hasAuthenticated(),
        userId : userIdFromToken (),
        isAdmin: controlAdmin(),
        lastname : userLastNameFromToken(),
        firstname : userFirstNameFromToken()
    } 
    )

    return (

        <AuthContext.Provider value = {{auth, setAuth}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;