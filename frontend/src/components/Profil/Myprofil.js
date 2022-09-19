import { Link } from 'react-router-dom';


function Myprofil (){

    return (
        <Link to="/profile/:id"><p> <i className="fas fa-user-alt"></i> Mon Profil</p></Link>        
    )
}

export default Myprofil;

