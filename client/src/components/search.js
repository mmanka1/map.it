import {useState, useEffect} from 'react';

const Search = () => {
    const [phrase, setPhrase] = useState("");
    const [when, setWhen] = useState("");
    const [where, setWhere] = useState("");
    const [duration, setDuration] = useState("");
    const [roomLocations, setRoomLocations] = useState([]);

    useEffect(() => {
        const fetchMapRoomData = async() => {
            const mapperResponse = await fetch('http://localhost:5000/map/');
            const content = await mapperResponse.json();
            setRoomLocations(content);
        }
        fetchMapRoomData().catch((err) => {
            console.error(err);
        });
    }, [])
        
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            //Use phrase and send it through to node app
            const classifierResponse = await fetch('http://localhost:5000/classify/search', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({"phrase": phrase})
              });
            const content = await classifierResponse.json();
            if (!content.error) {
                setWhen(content.message.confidenceWhen);
                setWhere(content.message.confidenceWhere);
                setDuration(content.message.confidenceDuration);
            }
        } catch (err) {
            console.error(err);
        }
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
            <text>{JSON.stringify(roomLocations)}</text>
        </div>
    )
}

export default Search