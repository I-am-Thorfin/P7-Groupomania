import './Loginmain.css'


function LoginMain(){

    return (

        <div className="login__container">
            <div className="login__container--titre">
                <h2>Bienvenue sur Groupomania</h2>
            </div>
            <div className="login__style"></div>
            <div className="login_baseform">
                <form className ="login__form">
                    <label htmlFor="Login">
                        <i class="fas fa-sign-in-alt"></i>
                    </label>
                    <input type='text' id="Login" placeholder="Votre adresse mail de connexion"> 
                    </input>
                    <label htmlFor="Password">
                        <i class="fas fa-unlock-alt"></i>
                    </label>
                    <input type='password' id="Password" placeholder="Votre mot de passe"> 
                    </input>
                    <button>Connexion</button>
                </form>
                
            </div>
        </div>
    )

}

export default LoginMain;