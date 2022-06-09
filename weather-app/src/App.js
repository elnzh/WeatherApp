/**
 * Reference: Arpan Neupane
 * Youtube: https://www.youtube.com/watch?v=rtR4s626ebE
 */

import React,{useState} from 'react'
import './App.css'
function App(){

  const apiKey = '968c21dd1beed3a622f44a4eeba454be'
  const[weatherData, setWeatherData] = useState([{}])
  const [city,setCity] = useState("")

  const getWeather = (event)=>{
    if(event.key =="Enter"){
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`).then(
        response => response.json()
      ).then(
        data =>{
          setWeatherData(data)
          setCity("")
        }
      )
    }
  }
  return(
    <div className="container">
      <input 
        className="input" 
        placeholder = "enter city names"
        onChange = {e =>setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather}

      />
      {typeof weatherData.main === `undefined`? (
      <div >
        <p>Welcome to the weather app! Enter a city to start</p>
      </div>

    ):(
      
      <div className="weather-data">

        <p className="city">{weatherData.name}</p>
        <p className="temp">{Math.round((weatherData.main.temp- 32) * 5 / 9)} °C</p>
        <p className="weather">{weatherData.weather[0].description}</p>
      </div>
    )}
    
    { weatherData.cod === "404" ? (
        <p> city does not exist, please type again</p>
        ):(
          <> 
          </>
    )} 





    </div>
  )
}
export default App