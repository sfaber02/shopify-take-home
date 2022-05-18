import React, { useState } from 'react';
import axios from 'axios';


import './style.css';

const App = () => {
    //State for storing responses from API
    const [responses, setResponses] = useState(() => []);

    //click handler for submit button
    const handleSubmit = async e => {
        e.preventDefault();
        if (e.target.textInput.value) {

            //body for API post request
            const data = JSON.stringify({
                "prompt": e.target.textInput.value,
                "max_tokens": 2000,
                "temperature": 1,
                "top_p": 1,
                "frequency_penalty": 0,
                "presence_penalty": 0
              });
              
              //axious config object API post request
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
                    e.target.textInput.value = '';  
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
            <h1>HAL 9001</h1>
            <form onSubmit={handleSubmit} id="inputForm">
                <label>Enter Prompt</label>
                <input type='textarea' id='textInput' rows="10" cols="50" />
                <input type='submit'  id='submitButton' />
            </form>
            {responses.length > 0 &&
                <div id="responseContainer">
                    {responses.map(e => {
                        return (
                            <div key={Date.now()} className="reponses">
                                {e.prompt}
                                <br />
                                {e.response}
                            </div>
                        )
                    })}    
                </div>
            }
        </div>
    )
}

export { App };

