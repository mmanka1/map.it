import { logDOM } from '@testing-library/react';
import {useState, useEffect} from 'react';

const Search = ({setVertices, setThreeDoFLocation}) => {
    const [phrase, setPhrase] = useState("");
    const [when, setWhen] = useState("");
    const [where, setWhere] = useState("");
    const [duration, setDuration] = useState("");
    const [roomLocations, setRoomLocations] = useState({});

    useEffect(() => {
        const fetchMapRoomData = async() => {
            const mapperResponse = await fetch('http://localhost:5000/map/');
            const content = await mapperResponse.json();
            const updatedContent = [];
            content.rooms.forEach(room => {
                updatedContent.push({
                    ...room,
                    when: when,
                    where: where,
                    duration: duration
                })
            })
            setRoomLocations({rooms: updatedContent});
            setThreeDoFLocation({when: when, where: where, duration:duration});
        }
        fetchMapRoomData().catch((err) => {
            console.error(err);
        });
    }, []);
        
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
            console.log(content);

            //Send room locations object through to parent App.js component
            setVertices(roomLocations);

        } catch (err) {
            console.error(err);
        }
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