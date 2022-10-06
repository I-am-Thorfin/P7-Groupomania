import React, {createContext, useState} from "react";
import { hasAuthenticated, controlAdmin, userIDfromtoken } from '../services/AuthApi'


export const AuthContext = createContext ();

const AuthContextProvider = props => {

    const [auth, setAuth] = useState({ 
        isLogin : hasAuthenticated(),
        userId : userIDfromtoken(),
        isAdmin: controlAdmin()
    } 
    )

    return (

        <AuthContext.Provider value = {{auth, setAuth}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;