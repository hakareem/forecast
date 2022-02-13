import "./App.css";
import Axios from "axios";
import { useState } from "react";
import SunIcon from "./images/sun.png";
import ColdIcon from "./images/cold.png";

function App() {
  const [city, setCity] = useState("");
  const [citySearched, setCitySearched] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [showData, setShowData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currDay] = useState(0);
  const [icon, setIcon] = useState("");
  const getWeather = () => {
    setIsLoading(true);
    Axios.get(`https://goweather.herokuapp.com/weather/${city}`).then((res) => {
      setCitySearched(city);
      setIsLoading(false);
      setWeatherData(res.data);
      determineIcon(res.data);
      setShowData(true);
    });
  };

  const determineIcon = (weatherData) => {
    if (Number(weatherData.temperature.substr(1, 3)) > 15) {
      setIcon(SunIcon);
    } else {
      setIcon(ColdIcon);
    }
  };

  return (
    <div className='App'>
      <div className='inputContainer'>
        <input
          onChange={(e) => setCity(e.target.value)}
          type='text'
          className='inputs'
          placeholder='Enter a City'
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>
      <div className='dataContainer'>
        {isLoading && <h1>Data Loading...</h1>}
        {showData && (
          <div className='weatherCard'>
            <h1 className='dataCity'> {citySearched} </h1>
            <img className='weatherIcon' src={icon} alt='icon' />
            <h3 className='dataWeather'>{weatherData.description}</h3>
            <h1 className='dataTemperature'>{weatherData.temperature}</h1>
            <h1>{weatherData.forecast[currDay].wind}</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
