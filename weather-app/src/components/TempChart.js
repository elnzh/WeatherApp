import React from "react";
import 'chart.js/auto';
import { Chart, Line } from "react-chartjs-2";


export default function TempChart({
  temp=[], time=[]
}){
  
  if(temp.length===0 || time.length===0)return false;


    const option= {
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false
            }
          }
        }
    }
    

    
        
    return(
       <Line
            data={{
                labels:time,
                datasets: [
                    {
                        label: 'temp',
                        data: temp,
                    },
                ],

            }}
            options= {option}
            height={330}
            width={660}
       />
     
    );
}
