import { logDOM } from '@testing-library/react';
import {useState, useEffect} from 'react';

const Search = ({setVertices, setThreeDoFLocation}) => {
    const [phrase, setPhrase] = useState("");
    // const [when, setWhen] = useState("");
    // const [where, setWhere] = useState("");
    // const [duration, setDuration] = useState("");
    const [roomLocations, setRoomLocations] = useState({}); //room number and coordinates of the bounding boxes encapsulating the room location on the map
    // const [allRooms, setAllRooms] = useState({});
    // const [allAvailabilites, setAllAvailabilites] = useState({});

    useEffect(() => {
        const fetchMapRoomData = async() => {
            //Extract rooms from maps
            const mapperResponse = await fetch('http://localhost:5000/map/');
            const mapperContent = await mapperResponse.json();

            //Get all rooms
            const roomsResponse = await fetch('http://localhost:5000/book/rooms');
            const roomsContent = await roomsResponse.json();
            console.log(roomsContent);

            //Get all room availabilties for bookings
            const availabilitiesResponse = await fetch('http://localhost:5000/book/availabilities');
            const availabilitiesContent = await availabilitiesResponse.json();
            console.log(availabilitiesContent);

            //Update list of room objects from map
            const updatedMapperContent = [];
            mapperContent.rooms.forEach(room => {
                //Get room type
                const roomType = roomsContent.rooms.meeting.find(r => r === room.number) !== undefined ? "meeting" :
                    (
                        roomsContent.rooms.study.find(r => r === room.number) !== undefined ? "study" : "classroom"
                    ) 

                const roomAvailabilties = [] //Get times of the day room is available
                for (const [key, value] of Object.entries(availabilitiesContent.availabilities)) {
                    if (value.find(r => r === room.number) === undefined) {
                        roomAvailabilties.push(key);
                    }
                }

                updatedMapperContent.push({
                    ...room,
                    when: roomAvailabilties,
                    where: roomType
                })

                console.log(updatedMapperContent);
            })
            setRoomLocations({rooms: updatedMapperContent});
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

            const classifierContent = await classifierResponse.json();
            console.log(classifierContent);

            if (!classifierContent.error) {
                //Set parameters (3 DoF) from predictions
                setThreeDoFLocation({
                    when: classifierContent.message.confidenceWhen, 
                    where: classifierContent.message.confidenceWhere, 
                    duration:classifierContent.message.confidenceDuration
                });
            }

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
                <button className="main" type = "submit">Search it!</button>
                <br></br>
            </form>
        </div>
    )
}

export default Search