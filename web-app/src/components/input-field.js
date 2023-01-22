import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios'

const WriteMessage =  () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    const data = {
        inputs: [
          e.value,
        ]
      }
    e.preventDefault();
    console.log(e);
    var test = await fetch("http://127.0.0.1:8000/get-result?msg=i%20love")
    console.log(await test.text())
            
            
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter your message:
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
  )
}

export default WriteMessage
