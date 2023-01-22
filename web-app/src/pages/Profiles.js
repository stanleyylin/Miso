import React from 'react'
import './profiles.css'
import MainGif from '../res/profiles.gif'
const Profiles = () => {
  return (
    <div className='bg-profile'>
      <p className='profiles-title'>Profiles Page Demo</p>
      <p className='profiles-instruct'>Track all harmful messages from employees! View chat histories and take appropriate action!</p>
      <img className='gif-file' src={MainGif}/>
    </div>
  )
}

export default Profiles
