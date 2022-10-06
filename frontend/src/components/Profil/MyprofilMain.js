import { useContext  } from 'react';
import {AuthContext} from "../../contexts/AuthContext"
import { Navigate } from 'react-router-dom';

function MyprofilMain (){

    const {auth} = useContext(AuthContext);
     

    return (

        <div className="Main__container">
            <>
                {!auth.isLogin && <Navigate to="/login" />}
            </>
            <p>Composant Mon Profil</p>
        </div>
    )

}

export default MyprofilMain;