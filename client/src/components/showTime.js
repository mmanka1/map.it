import {useState, useEffect, useRef} from 'react';

const ShowTime = ({when, duration, updateTime}) => {
    const [isMorning, setIsMorning] = useState(false);
    const [isAfternoon, setIsAfternoon] = useState(false);
    const [isNight, setIsNight] = useState(false);

    const morningRef = useRef();
    const morningTwoHourRef = useRef();
    const afternoonRef = useRef();
    const afternoonTwoHourRef = useRef();
    const nightRef = useRef();
    const nightTwoHourRef = useRef();

    useEffect(() => {
        if (when === "morning" && duration === "1 hour") {
            morningRef.current.focus();
        } else if (when === "morning" && duration === "2 hours") {
            morningRef.current.focus();
            morningTwoHourRef.current.focus();
        } else if (when === "afternoon" && duration === "1 hour") {
            afternoonRef.current.focus();
        } else if (when === "afternoon" && duration === "2 hours") {
            afternoonRef.current.focus();
            afternoonTwoHourRef.current.focus();
        } else if (when === "night" && duration === "1 hour") {
            nightRef.current.focus();
        } else if (when === "night" && duration === "2 hours") {
            nightRef.current.focus();
            nightTwoHourRef.current.focus();
        }
    }, [when, duration]);

    const handleClick = (e) => {
        e.preventDefault();
        updateTime(e.target.value);
    }

    return (
        <div class='times'>
            <form>
                <table>
                    <th><button ref = {morningRef} className="main" value='8AM' onClick = {handleClick}>8:00 AM</button></th>
                    <th><button ref = {morningTwoHourRef} className="main" value='9AM' onClick = {handleClick}>9:00 AM</button></th>
                    <th><button className="main" value='10AM' onClick = {handleClick}>10:00 AM</button></th>
                    <th><button className="main" value='11AM' onClick = {handleClick}>11:00 AM</button></th>
                    <th><button className="main" value='12PM' onClick = {handleClick}>12:00 PM</button></th>
                    <th><button ref = {afternoonRef} className="main" value='1PM' onClick = {handleClick}>1:00 PM</button></th>
                    <th><button ref = {afternoonTwoHourRef} className="main" value='2PM' onClick = {handleClick}>2:00 PM</button></th>
                    <th><button className="main" value='3PM' onClick = {handleClick}>3:00 PM</button></th>
                    <th><button className="main" value='4PM' onClick = {handleClick}>4:00 PM</button></th>
                    <th><button ref = {nightRef} className="main" value='5PM' onClick = {handleClick}>5:00 PM</button></th>
                    <th><button ref = {nightTwoHourRef} className="main" value='6PM' onClick = {handleClick}>6:00 PM</button></th>
                    <th><button className="main" value='7PM' onClick = {handleClick}>7:00 PM</button></th>
                    <th><button className="main" value='8PM' onClick = {handleClick}>8:00 PM</button></th>
                </table>
            </form>
      </div>
    )
}

export default ShowTime