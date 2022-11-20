import logo from './logo.svg';
import Search from './components/search';
import Map from './components/map';
import ShowTime from './components/showTime'
import './App.css';
import mapitLogo from './assets/Logo.png'
import {useState} from 'react';

function App() {
  const [roomLabelVertices, setRoomLabelVertices] = useState({});
  const [threeDoFLocation, setThreeDoFLocation] = useState({});
  const setVertices = (vertices) => {
    setRoomLabelVertices(vertices);
  }

  const setThreeDofLocation = (loc) => {
    setThreeDoFLocation(loc);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src = {mapitLogo} width='800px' height='150px'></img>
        <Search setVertices = {setVertices}/>
        <h3>Here are the ideal room availabilities based on your prompt</h3>
        <Map rooms = {roomLabelVertices.rooms} when = {threeDoFLocation.when} where = {threeDoFLocation.where} duration = {threeDoFLocation.duration}/>
        <br></br>
        <ShowTime/>
      </header>
    </div>
  );
}

export default App;
