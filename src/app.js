import React, { useState } from 'react';
import axios from 'axios';

import './style.css';

const App = () => {
    //State for storing responses from API
    const [responses, setResponses] = useState(() => []);


    const handleSubmit = async e => {
        e.preventDefault();
        if (e.target.textInput.value) {
            const data = JSON.stringify({
                "prompt": e.target.textInput.value,
                "max_tokens": 2000,
                "temperature": 1,
                "top_p": 1,
                "frequency_penalty": 0,
                "presence_penalty": 0
              });
              
              const config = {
                method: 'post',
                url: 'https://api.openai.com/v1/engines/text-curie-001/completions',
                headers: { 
                  'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`, 
                  'Content-Type': 'application/json'
                },
                data : data
              };

              axios(config)
                .then(function (response) {
                setResponses(prev => 
                    [
                        {
                            prompt: e.target.textInput.value, 
                            response: response.data.choices[0].text
                        }, 
                        ...prev
                    ])
                console.log(response.data.choices[0].text);
            })
            .catch(function (error) {
                console.log(error);
            });
                
        } else {
            return;
        }
    }

    return (
        <div id='mainContainer'>
            <h1>Fun with AI</h1>
            <form onSubmit={handleSubmit}>
                <label>Enter Prompt</label>
                <input type='textarea' id='textInput' />
                <input type='submit'  id='submitButton' />
                <h1>Responses</h1>
                {responses.map(e => {
                    return (
                        <div>
                            {e.prompt}
                            <br />
                            {e.response}
                        </div>
                    )
                })}

            </form>
            
        </div>
    )
}

export { App };

