import { logDOM } from '@testing-library/react';
import {useState, useEffect} from 'react';


const Search = () => {
    const [phrase, setPhrase] = useState("");
    const [when, setWhen] = useState("");
    const [where, setWhere] = useState("");
    const [duration, setDuration] = useState("");
        
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("hello");
        //Use phrase and send it through to node app
        const rawResponse = await fetch('http://localhost:5000/classifier/search', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"phrase": phrase})
          });
        const content = await rawResponse.json();
        if (!content.error) {
            setWhen(content.message.confidenceWhen);
            setWhere(content.message.confidenceWhere);
            setDuration(content.message.confidenceDuration);
        }
        console.log(content);
    }

    return (
        <div>
            <h5>Create your booking in</h5>
            <h4>AMIT CHAKMA ENGINEERING BUILDING, SECOND FLOOR</h4>
            <br></br>   
            <h5>What are you planning to do?</h5>
            <form onSubmit={handleSubmit}>
                <input type="text" value={phrase} onChange={(e) => setPhrase(e.target.value)}/>
                <br></br>
                <button type = "submit">Search it!</button>
                <br></br>
            </form>
        </div>
    )
}

export default Search