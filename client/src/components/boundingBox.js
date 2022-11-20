import {useState, useEffect} from 'react';

const BoundingBox = ({room, when, availabilities, duration, isSetManually, showBookingConfirmation, reload, setShowTimes, x, y}) => {
    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        console.log(reload);
        setIsAvailable(false);  //Reset availability

        if (!isSetManually) {   //Set automatically
            if (when === "morning") {
                if (duration === "1 hour") {
                    if (availabilities.find(a => a === "8AM") !== undefined) {
                        setIsAvailable(true);
                    }
                } else { //Duration is 2 hours
                    if (availabilities.find(a => a === "8AM") !== undefined && availabilities.find(a => a === "9AM") !== undefined) {
                        setIsAvailable(true);
                    }
                }
            } else if (when === "afternoon") {
                if (duration === "1 hour") {
                    if (availabilities.find(a => a === "12PM") !== undefined) {
                        setIsAvailable(true);
                    }
                } else { //Duration is 2 hours
                    if (availabilities.find(a => a === "1PM") !== undefined && availabilities.find(a => a === "2PM") !== undefined) {
                        setIsAvailable(true);
                    }
                }
            } else if (when === "night") {
                if (duration === "1 hour") {
                    if (availabilities.find(a => a === "5PM") !== undefined) {
                        setIsAvailable(true);
                    }
                } else { //Duration is 2 hours
                    if (availabilities.find(a => a === "5PM") !== undefined && availabilities.find(a => a === "6PM") !== undefined) {
                        setIsAvailable(true);
                    }
                }
            }
        } else {   //Set manually
            console.log('Being set manually')
            if (availabilities.find(a => a === when) !== undefined) {
                setIsAvailable(true);
            }
        }
       
    }, [room, when, availabilities, duration, isSetManually, reload])

    const handleBooking = async(e) => {
        e.preventDefault();
        try {
            //Use phrase and send it through to node app
            const bookingResponse = await fetch('http://localhost:5000/book/confirm', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "time": when === "morning" ? "8AM" : (when === "afternoon" ? "1PM" : (when === "night" ? "5PM" : when)),
                    "room": room.number
                })
            });

            const bookingContent = await bookingResponse.json();
            showBookingConfirmation(bookingContent.message);
            setShowTimes(false);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div style = {{
            position: 'absolute',
            left: 800/1800 * (16.7*x + Math.min(...room.vertices.map(coordinates => coordinates.x))),
            top: 280/656 *(2.3*y + Math.min(...room.vertices.map(coordinates => coordinates.y))),
            height: 1.05*Math.max(...room.vertices.map(coordinates => coordinates.y)) - 
                     Math.min(...room.vertices.map(coordinates => coordinates.y)),
            width: 1.001*Math.max(...room.vertices.map(coordinates => coordinates.x)) - 
                    Math.min(...room.vertices.map(coordinates => coordinates.x)),
            zIndex: 1
        }}> 
        {
            isAvailable ? (
                <button className="available" onClick = {handleBooking}>Book it!</button>
            ) : (
                <button className="unavailable">Unavailable</button>
            )
        }      
        </div>
    )
}

export default BoundingBox;