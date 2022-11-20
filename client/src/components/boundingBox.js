import {useState, useEffect} from 'react';

const BoundingBox = ({room, x, y}) => {
    return (
        <div style = {{
            opacity: 0.5,
            position: 'absolute',
            background: 'green',
            left: 800/1800 * (18.6*x + Math.min(...room.vertices.map(coordinates => coordinates.x))),
            top: 280/656 *(2.37*y + Math.min(...room.vertices.map(coordinates => coordinates.y))),
            height: 1.03*Math.max(...room.vertices.map(coordinates => coordinates.y)) - 
                     Math.min(...room.vertices.map(coordinates => coordinates.y)),
            width: 1.001*Math.max(...room.vertices.map(coordinates => coordinates.x)) - 
                    Math.min(...room.vertices.map(coordinates => coordinates.x)),
            zIndex: 1
        }}>   
        </div>
    )
}

export default BoundingBox;