import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios'
import './inputfield.css'
import WriteMessage from './WriteMessage'
import Profile from '../res/profile.png'

const InputField = () => {
  const [name, setName] = useState("")
  const[val1, setVal1] =  useState("Type your Message below and submit...")
  const[val2, setVal2] =  useState("The bot will warn you if your message is misogynistic and/or toxic!")

  const handleSubmit = async (e) => {
    const data = {
        inputs: [
          e.value,
        ]
      }
    e.preventDefault();
    console.log(e);
    var textField = name.replace(" ", "%20") 
    var test = await fetch("http://127.0.0.1:8000/get-result?msg=" + textField + "")
    console.log(await test.text())          
  }

  return (
    <div>
      <div className='outer-box'>
        <div className='line-1'>
            <img className='profile1' src={Profile}/>
            <p className='user-message'>{val1}</p> 
        </div>

        <div>
          <img className='profile2' src={Profile}/>
          <p className='bot-message'>{val2}</p>
        </div>
      </div>
      

      <div className='bottom-half'>
        <form onSubmit={handleSubmit}>
          <label>
            <input 
              placeholder="Message Miso Bot"
              className='submitter'
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <input type="submit" value="➤" className='submit'/>
        </form>
      </div>
    </div>
  )
}

export default InputField
