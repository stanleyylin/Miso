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
    document.getElementById('bubble1').innerHTML=name;
    e.preventDefault();
    console.log(e);
    var textField = name.replace(" ", "%20") 
    var test = await fetch("http://127.0.0.1:8000/get-result?msg=" + textField + "")
    var inputText = await test.text()
    console.log(inputText)
    var arr = inputText.substring(1,inputText.length-1).split(",");
    console.log(arr[2])
    console.log(arr[3])
    if(arr[0].substring(1,arr[0].length-1) === "True" && arr[1] > 60)
    {
      document.getElementById('bubble2').innerHTML="Warning! This comment is potentially misogynistic. Please be more mindful of your language.";
      document.getElementById('bubble2').style.backgroundColor = "#A41919";
    }
    else if(arr[2].substring(1,arr[2].length-1) === "Toxic" && arr[3] > 80)
    {
      document.getElementById('bubble2').innerHTML="Warning! This comment is potentially toxic. Please be more mindful of your language.";
      document.getElementById('bubble2').style.backgroundColor = "#A41919";
    }
    else
    {
      document.getElementById('bubble2').innerHTML="This comment has not been detected as misogynistic or toxic. Well done!";
      document.getElementById('bubble2').style.backgroundColor = "#3BAB7F";
    }

  }

  return (
    <div>
      <div className='center-it'>
        <p className='pretty'> Demo </p>
      </div>
      <div className='center-it'>
        <p className='instruct'> Send a message for toxicity and sexism detection! </p>
      </div>
      <div className='outer-box'>
        <div className='line-1'>
            <p className="name1">Your user</p>
            <img className='profile1' src={Profile}/>
            <p id="bubble1" className='user-message'>{val1}</p> 
        </div>

        <div>
          <p className="name2">Miso Bot</p>
          <img className='profile2' src={Profile}/>
          <p id="bubble2" className='bot-message'>{val2}</p>
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
