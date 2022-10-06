import { Link } from 'react-router-dom';

function Signup (){

    return (
        <Link to="/signup">            
            <p><i className="fas fa-sign-out-alt"></i> S'inscrire</p>
        </Link>  
        
    )
}

export default Signup;