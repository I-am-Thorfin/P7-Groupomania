import { Link } from 'react-router-dom';
import { useContext  } from 'react';
import {AuthContext} from "../../contexts/AuthContext"



function Myprofil (){

    const {auth, setAuth} = useContext(AuthContext);
    const linkUserId = auth.userId;

    return (
        <Link to={`/profile/${linkUserId}`}><p> <i className="fas fa-user-alt"></i> Mon Profil</p></Link>        
    )
}

export default Myprofil;

