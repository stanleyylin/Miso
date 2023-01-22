import React from 'react'
import './navbar.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';


const Navbar = () => {
  return (
    <nav>
      <div className='title-box'>
        <li><Link to="/" className='title'>MISO</Link></li>
      </div>

      <div className='buttons'>
        <ul     className='buttons-inner'>
          <li><Link to="/demo" className='each-button'>Demo</Link></li>
          <li><Link to="/profiles" className='each-button'>Profiles</Link></li>
          <a href="https://discordapp.com/oauth2/authorize?&client_id=1066240980245811201&scope=bot">
            <li className='each-button'>Download</li></a>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
