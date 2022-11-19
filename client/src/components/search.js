import {useState, useEffect} from 'react';

const Search = () => {
    const [phrase, setPhrase] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        //Use phrase and send it through to node app
    }

    return (
        <div>
            <h1>Map.it</h1>
            <input type="text" value={phrase} onChange={(e) => setPhrase(e.target.value)}/>
            <button value={"Search for rooms"} onclick = {(e) => onSubmit()}>Search for rooms</button>
        </div>
    )
}

export default Search