import React, { Component } from 'react'
import { useState } from 'react'
import './democontainer.css'
import WriteMessage from './WriteMessage'
import Profile from '../res/profile.png'
const DemoContainer = () => {
  const[val1, setVal1] =  useState("Type your Message below and submit...")
  const[val2, setVal2] =  useState("The bot will warn you if your message is misogynistic and/or toxic!")

  const click = event => {
    setVal1(event.taget.value)
  }
  return (
    <div className='outer-box'>
      <div className='line-1'>
          <p> You</p>
          <img className='profile1' src={Profile}/>
          <p className='user-message'>{val1}</p>
          
      </div>

      <div>
        <img className='profile2' src={Profile}/>
        <p className='bot-message'>{val2}</p>
      </div>
      <div>

      </div>
    </div>

    
  )
}

export default DemoContainer


