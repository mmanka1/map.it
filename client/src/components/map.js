import {useState, useEffect, useRef} from 'react';
import mapImage from '../assets/ACEBmap.png';
import BoundingBox from './boundingBox';

const Map = ({rooms, when, where, duration, isManual, updateReload, reload, setShowTimes}) => {
    const [shouldHideMap, setShouldHideMap] = useState(false);
    const [bookingMsg, setBookingMsg] = useState("");

    //Get the position of the map in the beginning
    useEffect(() => {
        getPosition();
    }, []);

    //Re-calculate X and Y of the map when the window is resized by the user
    useEffect(() => {
        window.addEventListener("resize", getPosition);
    }, []);

    //This ref will be connected to the image of the map
    const mapRef = useRef();
 
    const [x, setX] = useState(); //X
    const [y, setY] = useState(); //Y

    //This function calculate X and Y
    const getPosition = () => {
        const x = mapRef.current.offsetLeft;
        setX(x);

        const y = mapRef.current.offsetTop;
        setY(y);
    };

    const showBookingConfirmation = (msg) => {
        setShouldHideMap(true);
        setBookingMsg(msg);
    };

    return (
        <>
            {
                !shouldHideMap ? (
                    <>
                        <h3>Here are the ideal room availabilities based on your prompt</h3>
                        <img src = {mapImage} ref={mapRef} width='800px' height='280px'/>
                        {
                            rooms !== undefined ? (
                                rooms.map(room => {
                                    return (
                                        room.where === where ? <BoundingBox room = {room} when = {when} availabilities = {room.when} duration = {duration} isSetManually = {isManual} showBookingConfirmation = {showBookingConfirmation} reload = {reload} setShowTimes={setShowTimes} x = {x} y = {y}/> : <></>
                                    )
                                })
                            ) : (
                                <></>
                            ) 
                        }
                    </>
                    
                ) : (
                    <div> 
                        <h3>{bookingMsg}</h3>
                        <button onClick={(e) => { 
                            setShouldHideMap(false);
                            setBookingMsg("");
                            updateReload();
                            setShowTimes(true);
                            window.location.reload(false);
                        }}>
                        Make another booking
                        </button>
                    </div>
                )
            }
        </>
    )
}

export default Map;