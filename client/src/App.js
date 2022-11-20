import logo from './logo.svg';
import Search from './components/search';
import ShowTime from './components/showTime'
import './App.css';
import mapitLogo from './assets/Logo.png'
import mapImage from './assets/ACEBmap.png'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src = {mapitLogo} width='800px' height='150px'></img>

        <Search/>

        <h3>Here are the ideal room availabilities based on your prompt</h3>

        <img src = {mapImage} width='800px' height='280px'></img>
        <br></br>

        <ShowTime/>

      </header>
    </div>
  );
}

export default App;
