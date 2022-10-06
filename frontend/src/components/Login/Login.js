import { Link } from 'react-router-dom';

function Login (){

    return (
        <Link to="/login">            
            <p><i className="fas fa-sign-out-alt"></i> Se connecter</p>
        </Link>  
        
    )

}

export default Login;