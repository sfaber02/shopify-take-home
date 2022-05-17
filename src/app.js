import React, { useState } from 'react';
import './style.css';

const App = () => {
    //State for storing responses from API
    const [responses, setResponses] = useState(() => []);
    

    return (
        <div id='mainContainer'>
            <h1>Fun with AI</h1>
            <form>
                <label>Enter Prompt</label>
                <input type='textarea' />
                <input type='submit' />
                <h1>Responses</h1>

            </form>
            
        </div>
    )
}

export { App };