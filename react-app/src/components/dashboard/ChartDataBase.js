import React, { useState, useEffect } from 'react';

import './mini-profile.css'

import {Bar} from 'react-chartjs-2';

import './mini-profile.css'



export default function ChartDataBase({types}) {

  const [checked, setChecked] = useState(false)
  const [stockChartXValues, setstockChartXValues] = useState([]);
  const [stockChartYValues, setstockChartYValues] = useState([]);

  useEffect(() => {
    (async () => {
        let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
  if (types) {
    
    setChecked(true)
    const sortedTypes = types.sort((groceryA, groceryB) => groceryA.days_to_expiry - groceryB.days_to_expiry)
    sortedTypes.map((type) => {
        stockChartXValuesFunction.push(type.type)
        stockChartYValuesFunction.push(type.days_to_expiry)
    })
  }
  setstockChartXValues(stockChartXValuesFunction)
  setstockChartYValues(stockChartYValuesFunction)
  })()
  }, [types])

  const data = {
    labels: stockChartXValues,
    datasets: [
      {
        label: 'Days to Expiry',
        backgroundColor: 'salmon',
        borderColor: 'salmon',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: stockChartYValues
      }
    ]
  };
  return (
    <React.Fragment>
      <div className='data-bars'>
      {/* {types.map((type) => (
        <Slide elevation={4} direction="up" in={checked} mountOnEnter unmountOnExit>
         
            <div className='spectrum-children' key={type.id} >
              
              {type.type}
              
               
             
                <div className='spectrum-image'>
                {type.image ? (
                <img src={type.image} alt='grocery pic' />
            ) : (
                <img src={fridge} alt='stock fridge' />
            )}
            </div>
            
            </div>
        
            </Slide>
          ))} */}
         <div>
        
        <Bar
          data={data}
          width={1232}
          height={250}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
          </div>
          
    </React.Fragment>
  );
}