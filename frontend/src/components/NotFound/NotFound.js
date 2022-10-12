import { Link } from 'react-router-dom';
import "./NotFound.css"




function NotFound (){
  
    return (
        <div className='notfound'><h2><i className="far fa-grin-beam-sweat"></i> Oops ! Cette Page n'existe pas</h2>
        <Link to={`/home`}><p> <i className="fas fa-chevron-circle-right"></i> Revenez auprès de nous !</p></Link> </div>
               
    )
}

export default NotFound;