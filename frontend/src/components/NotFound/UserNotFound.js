import { Link } from 'react-router-dom';
import "./NotFound.css"




function UserNotFound (){
  
    return (
        <div className='notfound'><h2><i className="far fa-grin-beam-sweat"></i> Oops ! Nous ne trouvons pas cet utilisateur. Il est possible que son compte ait été supprimé ou que vous n'ayez simplement pas les droits pour accéder à cette page. </h2>
        <Link to={`/home`}><p> <i className="fas fa-chevron-circle-right"></i> Revenez auprès de nous !</p></Link> </div>
               
    )
}

export default UserNotFound;