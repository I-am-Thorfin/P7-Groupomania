import { Link } from 'react-router-dom';
import "./NotFound.css"




function UserNotFound (){
  
    return (
        <div className='notfound'><h2><i className="far fa-grin-beam-sweat"></i> Oops ! Cet utilisateur n'existe pas. Il est possible que son compte ait été supprimé. </h2>
        <Link to={`/home`}><p> <i className="fas fa-chevron-circle-right"></i> Revenez auprès de nous !</p></Link> </div>
               
    )
}

export default UserNotFound;