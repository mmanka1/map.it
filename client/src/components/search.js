import { logDOM } from '@testing-library/react';
import {useState, useEffect} from 'react';


const Search = () => {
    const [phrase, setPhrase] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        //Use phrase and send it through to node app
    }

    return (
        <div>
            <h5>Create your booking in</h5>
            <h4>AMIT CHAKMA ENGINEERING BUILDING, SECOND FLOOR</h4>
            <br></br>

            <h5>What are you planning to do?</h5>
            <input type="text" value={phrase} onChange={(e) => setPhrase(e.target.value)}/>
            <br></br>
            <button value={"Search it!"} onclick = {(e) => onSubmit()}>Search it!</button>
            <br></br>
        </div>
    )
}

export default Search