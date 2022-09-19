import { Link } from 'react-router-dom';

function Login (){

    return (
        <Link to="/signin">            
            <p><i className="fas fa-sign-out-alt"></i> S'inscrire / Se connecter</p>
        </Link>
        
    )

}

export default Login;