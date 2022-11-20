import {useState, useEffect} from 'react';

const BoundingBox = ({room, x, y}) => {
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
            <button className="fill-div" onClick = {(e) => console.log("im a button")}>Book it!</button>
        </div>
    )
}

export default BoundingBox;