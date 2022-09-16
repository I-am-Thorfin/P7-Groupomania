
import './App.css';
import SigninMain from './components/Signin/SigninMain';
import LoginMain from './components/Login/LoginMain';
import MyprofilMain from './components/Profil/MyprofilMain';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import {Routes, Route} from "react-router-dom"


function App() {
  return (
    

    

    <div className="App">
      <Navbar />
      
       
      <main>
        
        <Routes>
          
          <Route path="/signin" element = {<SigninMain/>} />
          <Route path="/login" element = {<LoginMain/>} />
          <Route path="/home" element = {<Home/>} />
          <Route path="/profile/:id" element = {<MyprofilMain/>} />
          
        </Routes>

        
       

        


        
        
        
        
        
        
      </main>

      <footer>

      </footer>



    </div>
  );
}

export default App;
