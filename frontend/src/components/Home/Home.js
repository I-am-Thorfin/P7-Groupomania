import Comments from '../Comments/Comments';
import AddComments from '../Comments/AddComment'


function Home (){

    return (
        <div>
            <AddComments/>     
            <Comments/>  
        </div>
    )
}

export default Home;