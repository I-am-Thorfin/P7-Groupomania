import { useState } from 'react';
import './Signin.css'


function SigninMain(){

    const [stateSigninForm, setstateSigninForm] = useState({
        firstname : '',
        lastname :'',
        mail :'',
        password:''
    });

    const handleChange = (event) => {
        setstateSigninForm({
          ...stateSigninForm,
          [event.target.id]: event.target.value
        });
      }

    console.log(`
    Nom :${stateSigninForm.lastname}
    Prénom :${stateSigninForm.firstname}
    mail :${stateSigninForm.mail}
    password :${stateSigninForm.firstname}`
    )


    const lastname = 'stateSigninForm.lastname';
    const firstname ='stateSigninForm.firstname';
    const mail ='stateSigninForm.mail';
    const password ='stateSigninForm.firstname';

    let user = { lastname, firstname, mail, password }



    

    const handleSubmit = () => {      
               
    const signinFormData = new FormData();
     signinFormData.append("lastname", stateSigninForm.lastname)
     signinFormData.append("firstname", stateSigninForm.firstname)
     signinFormData.append("username", stateSigninForm.email)
     signinFormData.append("password", stateSigninForm.password)  

     try {
        console.log('Hello on submit')
        console.log(stateSigninForm.firstname)
        
       
        
      } catch(error) {
        console.log(error)
      }


    

    }  
    
    


    return (

        <div className="signin__container">
            <div className="signin__container--titre">
                <h2>Inscription</h2>
            </div>
            <div className="signin__style"></div>
            <div className="signin_baseform">
                <form className ="signin__form" onSubmit={handleSubmit}>
                    <label htmlFor="lastname">
                     <i className="fas fa-user"></i>
                    </label>
                    <input type='text' 
                    id="lastname" 
                    placeholder="Nom de Famille" 
                    value={stateSigninForm.lastname} 
                    onChange={handleChange}> 
                    </input>
                    <label htmlFor="firstname">
                     <i className="fas fa-user"></i>
                    </label>
                    <input type='text' 
                    id="firstname" 
                    placeholder="Prénom" 
                    value={stateSigninForm.firstname} 
                    onChange={handleChange}> 
                    </input>
                    <label htmlFor="mail">
                        <i className="fas fa-sign-in-alt"></i>
                    </label>
                    <input type='text' 
                    id="mail" 
                    placeholder="Votre adresse mail de connexion" 
                    value={stateSigninForm.mail} 
                    onChange={handleChange}> 
                    </input>
                    <label htmlFor="password">
                        <i className="fas fa-unlock-alt"></i>
                    </label>
                    <input type='password' 
                    id="password" 
                    placeholder="choisissez votre mot de passe" 
                    value={stateSigninForm.password} 
                    onChange={handleChange}> 
                    </input>
                    <button>S'inscrire</button>
                </form>
                
            </div>
        </div>
    )

}

export default SigninMain;