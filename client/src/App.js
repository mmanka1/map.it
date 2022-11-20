import logo from './logo.svg';
import Search from './components/search';
import Map from './components/map';
import ShowTime from './components/showTime'
import './App.css';
import mapitLogo from './assets/Logo.png'
import {useState, useEffect} from 'react';

function App() {
  const [roomLabelVertices, setRoomLabelVertices] = useState({});
  const [threeDoF, setThreeDoF] = useState({});
  const [isManual, setIsManual] = useState(false);
  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    setVertices(roomLabelVertices);
  }, [shouldReload])

  const setVertices = (vertices) => {
    setRoomLabelVertices(vertices);
  };

  const setThreeDoFLocation = (loc) => {
    setIsManual(false); //Reset if being searched and set automatically
    setThreeDoF(loc);
  };

  //Updating the time manually
  const updateWhenThreeDoF = (time) => {
    setThreeDoF((prevState) => ({
      ...prevState,
      when: time
    }));
    setIsManual(true);
  }

  const updateReload = () => {
    if (!shouldReload) {
      setShouldReload(true);
    } else {
      setShouldReload(false);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src = {mapitLogo} width='800px' height='150px'></img>
        <Search setVertices = {setVertices} setThreeDoFLocation={setThreeDoFLocation} reload={shouldReload}/>
        <Map rooms = {roomLabelVertices.rooms} when = {threeDoF.when} where = {threeDoF.where} duration = {threeDoF.duration} isManual = {isManual} updateReload={updateReload} reload = {shouldReload}/>
        <br></br>
        <ShowTime when = {threeDoF.when} duration = {threeDoF.duration} updateTime = {updateWhenThreeDoF}/>
      </header>
    </div>
  );
}

export default App;
