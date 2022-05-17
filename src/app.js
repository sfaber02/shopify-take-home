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
                console.log(response.data);
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

            </form>
            
        </div>
    )
}

export { App };



/* 
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion("curie", {
  prompt: "Say this is a test",
  max_tokens: 5,
});
*/