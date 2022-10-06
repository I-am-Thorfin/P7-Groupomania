import React, {useState, useEffect} from 'react'
import './App.css';
import SignupMain from './components/Signup/SignupMain';
import LoginMain from './components/Login/LoginMain';
import MyprofilMain from './components/Profil/MyprofilMain';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import LogOrSign from './components/LogOrSign/LogOrSign';
import {Routes, Route} from "react-router-dom"
import AuthContextProvider from './contexts/AuthContext';





function App() {
  
 

  return (
    <AuthContextProvider>
      <div className="App">
      <Navbar />    
        <main>
          <Routes>
            <Route path="/logorsignup" element = {<LogOrSign/>} />
            <Route path="/signup" element = {<SignupMain/>} />
            <Route path="/login" element = {<LoginMain/>} />
            <Route path="/home" element = {<Home/>} />
            <Route path="/profile/:id" element = {<MyprofilMain/>} />
          </Routes>
        </main>

      <footer>

      </footer>



      </div>

    </AuthContextProvider>   
  );
}

export default App;
