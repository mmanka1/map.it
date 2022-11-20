import logo from './logo.svg';
import Search from './components/search';
import Map from './components/map';
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
        <div class='times'>
          <a href='#at8am'>8:00 AM</a>
          <a href='#at9am'>9:00 AM</a>
          <a href='#at10am'>10:00 AM</a>
          <a href='#at11am'>11:00 AM</a>
          <a href='#at12pm'>12:00 PM</a>
          <a href='#at1pm'>1:00 PM</a>
          <a href='#at2pm'>2:00 PM</a>
          <a href='#at3pm'>3:00 PM</a>
          <a href='#at4pm'>4:00 PM</a>
          <a href='#at5pm'>5:00 PM</a>
          <a href='#at6pm'>6:00 PM</a>
          <a href='#at7pm'>7:00 PM</a>
          <a href='#at8pm'>8:00 PM</a>
        </div>
      </header>
    </div>
  );
}

export default App;
