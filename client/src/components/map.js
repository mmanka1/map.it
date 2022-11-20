import {useState, useEffect, useRef} from 'react';
import mapImage from '../assets/ACEBmap.png';
import BoundingBox from './boundingBox';

const Map = ({rooms, when, where, duration}) => {
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
    return (
        <>
            <img src = {mapImage} ref={mapRef} width='800px' height='280px'/>
            {
                rooms !== undefined ? (
                    rooms.map(room => {
                        console.log(room.where);
                        console.log(where);
                        return (
                            room.where === where ? <BoundingBox room = {room} when = {when} availabilities = {room.when} x = {x} y = {y}/> : <></>
                        )
                    })
                ) : (
                    <></>
                ) 
            }
            {/* {
                rooms !== undefined ? (
                    rooms.forEach(room => {
                        console.log(Math.min(...room.vertices.map(coordinates => coordinates.x)));
                    })
                ) : (
                    <></>
                )
            } */}

            {/* <div style = {{
                            opacity: 0.5,
                            position: 'absolute',
                            background: 'green',
                            left: x+700,
                            top: y+100,
                            height: 30,
                            width: 50,
                            zIndex: 1
            }}></div> */}

            {/* <h1>Position: </h1>
            <h2>X: {x ?? "No result"}</h2>
            <h2>Y: {y ?? "No result"}</h2> */}
        </>
    )
}

export default Map;