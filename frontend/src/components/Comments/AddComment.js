import './Addcomments.css'

function AddComments (){

    return (

        <div className="addcomment__container">
            <div className="addcomment__intro">
                <p>Vous souhaitez partager quelque chose ?</p>
            </div>
            <div className="addcomment__style"></div>

            <div className="addcomment_baseform">
                <form className ="addcomment__form">
                    <label htmlFor="AddComment">
                       <i class="far fa-comment fa-2x"></i>
                    </label>
                    <input type='text' id="AddComment" placeholder="Ecrivez nous ici !"> 
                    </input>
                    
                    <button>Envoyer</button>
                </form>
            </div>
        
        </div>
    )

}

export default AddComments;