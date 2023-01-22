import React, { useState } from 'react';
import axios from 'axios';

function ToxicityDetection() {
    const [message, setMessage] = useState('');

    function submitMessage(e) {
      console.log(e);
        axios.post('https://api.cohere.ai/classify', {
            data: {
              inputs: [
                e.value,
              ]
            },
            headers: {
                'Authorization': 'Bearer hnRaqqJ4BgywsYAyrKTZDhva7WVnm8dpwzYky898'
            }
        })
            .then(response => {
                // handle success
                console.log(response.data);
                if(response.data.toxicity.toxicity_score > 0.5) {
                    console.log("Toxic");
                } else {
                    console.log("Benign");
                }
            })
            .catch(error => {
                // handle error
                console.log(error);
            });
    }

    return (
        <div>
            <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
            <button onClick={submitMessage}>Submit</button>
        </div>
    );
}

export default ToxicityDetection;
