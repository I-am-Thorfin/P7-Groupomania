import React, {useState, useEffect} from 'react'
import './Navbar.css'
import logo from './icon-left-font-monochrome-white.svg';
import Logout from '../Logout/Logout';
import Login from '../Login/Login';
import Myprofil from '../Profil/Myprofil';
import { Link } from 'react-router-dom';



export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState (false);
  const [largeur, setLargeur] = useState (window.innerWidth);
  

  const toggleNav = () => {
    setToggleMenu(!toggleMenu)
  }

  useEffect ( () => {
    const changeWidth = () => {
        setLargeur(window.innerWidth);
    }

    window.addEventListener ('resize', changeWidth);

    return () => {
        window.removeEventListener('resize', changeWidth);
    }

  }, []
  )

  return (
    <nav>
        <Link to="/Home">
           <img src={logo} className="nav__logo" alt="logo Groupomania" /> 
       </Link>
        <div className='nav__bar'>
          {(toggleMenu || largeur > 762) && (  
            <ul className="nav__list">
             <li className="nav__list--items">
                 <Myprofil/>
             </li>
             <li className="nav__list--items">
                <Login/>
             </li>
             <li className="nav__list--items">
                <Logout/>
             </li>
            </ul>
          )}  

            <button onClick={toggleNav} className="navbtn"><i className="fas fa-bars"></i></button>
        </div>
    </nav>
  )
}
