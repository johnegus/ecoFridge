import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Title from './Title';
import './mini-profile.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import fridge from '../dashboard/fridge.png';


// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

export default function Chart() {
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [groceries, setGroceries] = useState({});
  console.log("Outside: ", localStorage.hasOwnProperty('userId'))

  const userId = localStorage.getItem('userId') 

    useEffect(() => {
      console.log("Inside: ", localStorage.hasOwnProperty('userId'))

      fetch(`/api/groceries/user/${userId}`).then(res =>
        res.json().then(data => {
            setGroceries(data.groceries)
            
            setTimeout(function(){ setLoaded(true); }, 500);
          })
        )
    }, [])
  
  if (!loaded ) {
    return (
      <>
      
      <main className="centered middled">
        <div><b>Fetching grocery data...</b></div>
          
        <CircularProgress />
        
        </main>
  
      </>
      )
    }

  return (
    <React.Fragment>
      <div className='spectrum-container'>
      {groceries.map((grocery) => (
            <div className='spectrum-children' key={grocery.id}>
              
              {grocery.item_name}
              
               
                <div 
              >{grocery.type.days_to_expiry} days
                </div>
                <div className='spectrum-image'>
                {grocery.type.image ? (
                <img src={grocery.type.image} alt='grocery pic' />
            ) : (
                <img src={fridge} alt='stock fridge' />
            )}
            </div>
            </div>
          ))}
          </div>
    </React.Fragment>
  );
}
