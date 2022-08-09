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
            if(time[i]==0){
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

   
   

    return (
        <div>
            <div id='display'>
                <TempChart id ='chart' temp={tempStatus} time={timeStatus}/>
            </div>
            <div className='weather-forecast'>
                <button onClick={()=>handelButtons(0)}>today</button>
                <button onClick={()=>handelButtons(1)}>tmr</button>
                <button onClick={()=>handelButtons(2)}>next</button>
                <button onClick={()=>handelButtons(3)}>next</button>
            </div>
        </div>);
}