import { useState, useContext  } from 'react';
import './Loginmain.css'
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { login } from '../../services/AuthApi'
import {AuthContext} from "../../contexts/AuthContext"
import { Link } from 'react-router-dom';


function LoginMain(){

    const {auth, setAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    ///////////// FONCTION DE LOGIN  /////////////
    

    const [user, setUser] = useState ({
        email: "",
        password: ""
    });

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        console.log(name, value);

        setUser({...user, [name]: value})
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const response = await login(user);
            console.log("///response///")
            console.log(response)
            console.log("///response END///")
            setAuth ({isLogin : response} )  
            window.location.reload()        
            //navigate("/Home")
        }

        catch ({ response }) { console.log(response) }
        }

    //END/////////// FONCTION DE LOGIN ///////////END//    

    return (
        
        
        <div>
            


                {(!auth.isLogin && (
                <>
                <div className="login__container">
                        <div className="login__container--titre">
                            <h2>Bienvenue sur Groupomania</h2>
                        </div>
                    <div className="login__style"></div>
                    <div className="login_baseform">
                        <form className ="login__form" onSubmit={handleSubmit} >
                            <label htmlFor="mail">
                                <i className="fas fa-sign-in-alt"></i>
                            </label>
                            <input type='text' id="email" name="email" placeholder="Votre adresse mail de connexion" 
                            onChange={handleChange}> 
                            </input>
                            <label htmlFor="password">
                                <i className="fas fa-unlock-alt"></i>
                            </label>
                            <input type='password' id="password" name="password" placeholder="Votre mot de passe"  
                            onChange={handleChange}> 
                            </input>
                            <button>Connexion</button>
                            
                        </form>
                        <p>Vous n'avez pas encore de compte ?</p>
                        <Link to="/signup">            
                            <p><i className="fas fa-sign-out-alt"></i> Inscrivez-vous !</p>
                        </Link>
                    </div>
                </div>    
                </>
                )
                
                ) || (
                    <>
                    <Navigate to="/home" />
                    </>


                )}            
            
        </div>    
    )
}

export default LoginMain;