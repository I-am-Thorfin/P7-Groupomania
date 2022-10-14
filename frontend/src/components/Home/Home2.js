import Comments from '../Comments/Comments';

import AddComments from './Home';
import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import {AuthContext} from "../../contexts/AuthContext"
import { getOneUser, controlAdmin, userIDfromtoken } from '../../services/AuthApi';






function Home (){

const {auth, setAuth} = useContext(AuthContext);

console.log(auth)



    


    return (

        

        
       

        <div>
            <>
                {!auth.isLogin && <Navigate to="/login" />}
            </>
            
            <AddComments/>   
             
        </div>
    )
}

export default Home;