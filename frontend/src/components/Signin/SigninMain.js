import './Signin.css'


function SigninMain(){

    return (

        <div className="signin__container">
            <div className="signin__container--titre">
                <h2>Inscription</h2>
            </div>
            <div className="signin__style"></div>
            <div className="signin_baseform">
                <form className ="signin__form">
                    <label htmlFor="name">
                     <i class="fas fa-user"></i>
                    </label>
                    <input type='text' id="name" placeholder="Nom de Famille"> 
                    </input>
                    <label htmlFor="firstname">
                     <i class="fas fa-user"></i>
                    </label>
                    <input type='text' id="firstname" placeholder="Prénom"> 
                    </input>
                    <label htmlFor="Login">
                        <i class="fas fa-sign-in-alt"></i>
                    </label>
                    <input type='text' id="Login" placeholder="Votre adresse mail de connexion"> 
                    </input>
                    <label htmlFor="Login">
                        <i class="fas fa-unlock-alt"></i>
                    </label>
                    <input type='password' id="Login" placeholder="choisissez votre mot de passe"> 
                    </input>
                    <button>S'inscrire</button>
                </form>
                
            </div>
        </div>
    )

}

export default SigninMain;