
import React,{useState,useEffect} from 'react'
import './App.css'
import ForecastRender from './components/ForecastRender';





function App(){
  const apiKey ='968c21dd1beed3a622f44a4eeba454be';
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState([{}]);
  const [forcastWeather,setForcastWeather]=useState([]);


  const getWeather = (props) =>{
    if(props.key==='Enter' || props==='onclick'){
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`).then(
        response => response.json()
      ).then(
        data => {
          setWeather(data)
          setCity("")
          return  fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&appid=${apiKey}`).then(
            response => response.json()
          )
        }
      ).then(
        data => {
           setForcastWeather(data)
           
        }
      )
      
  }
  
}

const [time,setTime] = useState([]);
const [temp, setTemp] = useState([]);

useEffect(() => {
  const obj = settemp();
  setTemp(obj['temp']);
  setTime(obj['time']);
}, [forcastWeather]);



function settemp(){
  let result={
    'time':[],
    'temp':[],
  }
  if(typeof forcastWeather.city==='undefined') return [];
  let ti=[];
  let te=[];
  
  
  for(let i=0;i < forcastWeather.list.length;i++){
    let day= new Date(forcastWeather.list[i].dt*1000);
    
    //("0" + day.getHours()).slice(-2)
    ti.push(day.getHours());
    te.push(forcastWeather.list[i].main.temp);
  }
  result['temp']=te;
  result['time']=ti;
  return result;
}



  return (
    <div className='container'>
 
      <div className='inputContainer'>
       <input className='input' placeholder='Please input a valid city name' onChange={e=>setCity(e.target.value)} value={city}  onKeyPress={getWeather}/>
        <button className='button' onClick={()=>getWeather('onclick')} >Enter</button>
      </div>

      {(typeof weather.main==='undefined' ||typeof forcastWeather.city==='undefined') ? (
        <p>Welcome to the Weather App!</p>
      ):(
        <div>
        <div className='weather-data'>
          
          <p className="city">{weather.name}</p>
          <p className="temp">{weather.main.temp} °C</p>
          
   
          <p className="weather">{weather.weather[0].description}</p>
          
          

          
         
          <div>
            <ForecastRender temp={temp} time={time}/>
          </div>
        </div>
        </div>
       
      )}
      
      { weather.cod === "404" ? (
        <p> city does not exist, please type again</p>
        ):(
          <> 
          </>
    )} 

    </div>
  );

}

export default App