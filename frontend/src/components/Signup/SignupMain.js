import { useState, useContext } from 'react';
import './Signup.css'
import axios from 'axios';
import { createNewUser } from '../../services/AuthApi'
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import {AuthContext} from "../../contexts/AuthContext"


function SignupMain(){
    const navigate = useNavigate();
    const {auth, setAuth} = useContext(AuthContext);
    const formData = new FormData();

    const [stateSignupForm, setstateSignupForm] = useState({
        lastname :"",
        firstname : "",
        email :"",
        password:""
    });

    const handleChange = ({currentTarget}) => {

        const {name, value} = currentTarget;
        // console.log(name, value)  //-> Pour vérifier les champs à l'inscription. Ne jamais laisser ce console.log visible.
        setstateSignupForm({...stateSignupForm, [name]: value})
    } 
    


    const handleSubmit = async event => {    
       event.preventDefault();          

       


     try { 
        const response = await createNewUser(stateSignupForm);
        console.log(response)
        console.log( "Félicitations, votre compte vient d'être créé" )
        navigate("/Home")           
      } 
      
      catch(error) {
        console.log(error)
      }


      event.preventDefault();

    }  
    
    


    return (


        <div>
            


                {(!auth.isLogin && (
                <>
                <div className="signup__container">
            <div className="signup__container--titre">
                <h2>Inscription</h2>
            </div>
            <div className="signup__style"></div>
            <div className="signup_baseform">
                <form className ="signup__form" onSubmit={handleSubmit}>
                    <label htmlFor="lastname">
                     <i className="fas fa-user"></i>
                    </label>
                    <input type='text' 
                    id="lastname"
                    name="lastname" 
                    placeholder="Nom de Famille" 
                    onChange={handleChange}> 
                    </input>
                    <label htmlFor="firstname">
                     <i className="fas fa-user"></i>
                    </label>
                    <input type='text' 
                    id="firstname"
                    name="firstname" 
                    placeholder="Prénom"  
                    onChange={handleChange}> 
                    </input>
                    <label htmlFor="email">
                        <i className="fas fa-sign-in-alt"></i>
                    </label>
                    <input type='email' 
                    id="email"
                    name="email" 
                    placeholder="Votre adresse mail de connexion"  
                    onChange={handleChange}> 
                    </input>
                    <label htmlFor="password">
                        <i className="fas fa-unlock-alt"></i>
                    </label>
                    <input type='password' 
                    id="password"
                    name="password" 
                    placeholder="choisissez votre mot de passe"  
                    onChange={handleChange}> 
                    </input>
                    <button>S'inscrire</button>
                </form>
                
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

export default SignupMain;