import React, { useState, useEffect } from 'react'
import TempChart from './TempChart'

export default function ForecastRender({
    temp=[],time=[]
}  
){
    const [tempStatus, setTempStatus] = useState([]);
    const [timeStatus, settimeStatus] = useState([]);
    useEffect(()=>{
        setTempStatus(temp);
        settimeStatus(time);
    },[temp,time]);
   
    

    let day_index=[];
    function getEachDaysData(){
        let iter=0;
        for(let i = 0;i<time.length;i++){
            if(time[i]===0){
                day_index[iter]=i;
                iter++;
            }
        }
    }


    getEachDaysData();

    function handelButtons(id){
        if(id===0){
            setTempStatus(temp.slice(0,day_index[0]));
            settimeStatus(time.slice(0,day_index[0]));
        }else if(id===1){
            setTempStatus(temp.slice(day_index[0],day_index[1]));
            settimeStatus(time.slice(day_index[0],day_index[1]));
        }else if(id===2){
            setTempStatus(temp.slice(day_index[1],day_index[2]));
            settimeStatus(time.slice(day_index[1],day_index[2]));
        }else if(id===3){
            setTempStatus(temp.slice(day_index[2],day_index[3]));
            settimeStatus(time.slice(day_index[2],day_index[3]));
        }
    }

   



    const today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']     

   

    return (
        <div>
            <div id='display'>
                <TempChart id ='chart' temp={tempStatus} time={timeStatus}/>
            </div>
            <div className='weather-forecast'>
                <button className = "button1" onClick={()=>handelButtons(0)}>{days[today.getDay()%7]}</button>
                <button className = "button1" onClick={()=>handelButtons(1)}>{days[(today.getDay()+1)%7]}</button>
                <button className = "button1" onClick={()=>handelButtons(2)}>{days[(today.getDay()+2)%7]}</button>
                <button className = "button1" onClick={()=>handelButtons(3)}>{days[(today.getDay()+3)%7]}</button>
            </div>
        </div>);
}