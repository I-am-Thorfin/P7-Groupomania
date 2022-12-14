import React, {useState, useEffect} from 'react'
import './App.css';
import SignupMain from './components/Signup/SignupMain';
import LoginMain from './components/Login/LoginMain';
import MyprofilMain from './components/Profil/MyprofilMain';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import {Routes, Route} from "react-router-dom"
import AuthContextProvider from './contexts/AuthContext';
import NotFound from './components/NotFound/NotFound';
import UserNotFound from './components/NotFound/UserNotFound';


function App() {
  
  return (
    <AuthContextProvider>
      <div className="App">
      <Navbar />    
        <main>
          <Routes>
            <Route path="*" element = {<NotFound/>} />
            <Route path="/userunfound" element = {<UserNotFound/>} />
            <Route path="/" element = {<Home/>} />
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
