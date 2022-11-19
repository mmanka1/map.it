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
        console.log(content.message);
    }

    return (
        <div>
            <h1>Map.it</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={phrase} onChange={(e) => setPhrase(e.target.value)}/>
                <button type = "submit">Search for rooms</button>
            </form>
            <ul>
                <li>{where}</li>
                <li>{when}</li>
                <li>{duration}</li>
            </ul>
        </div>
    )
}

export default Search