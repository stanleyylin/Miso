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
          <li><Link to="/demo" className='each-button'>Profiles</Link></li>
          <li className='each-button'>Download</li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
