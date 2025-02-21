import { useEffect, useState } from 'react'
import { WiRain, WiDaySunny } from 'react-icons/wi'


import './App.css'

const KEY = "76675876e17f4972973181919251602";


function App() {

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Paris");
  const [inputValue, setInputValue] = useState("");


  useEffect(()=>{
    fetch(`http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}`)
    .then(response => response.json())
    .then(data => setWeather(data))
    .catch(error => console.log("Error: ", error))
  }, [city]);

  const handleClick = () =>{
    setCity(inputValue)
  }

  if (!weather) return <p>Loading...</p>

  return (
    <>
      <div className="container">
        <div className="weather-card">
          <div className="location">
            <h1>{weather.location.name}</h1>
            <h2>{weather.location.country}</h2>
          </div>
          <div className="temperatures">
            <p>{Math.floor(weather.current.temp_c)}&deg;C</p>
            <p>{Math.floor(weather.current.temp_f)}&deg;F</p>
          </div>
          <p>Local Time: {(weather.location.localtime).slice(10, 16)}</p>
          <div className="icon">
            <WiRain size={100} />
          </div>
        </div>
      </div>
      <div className="input-container">
        <input 
        placeholder='Enter City'
        type='text'
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={(event)=>{
          if(event.key === "Enter"){
            handleClick();
          }
        }}
        ></input>
        <button onClick={handleClick}>Search</button>
      </div>

    </>
  )
}

export default App;
