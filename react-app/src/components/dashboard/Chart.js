import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Title from './Title';
import './mini-profile.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import fridge from '../dashboard/fridge.png';
import { DeleteGrocery } from './delete/Delete';
import { ExpireCountdown } from './dateDiffer/ExpireCountdown';


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

export default function Chart({groceries, setGroceries}) {

  // const ordered = Object.keys(groceries).sort().reduce(
  //   (obj, key) => { 
  //     obj[key] = groceries[key]; 
  //     return obj;
  //   }, 
  //   {}
  // );


  return (
    <React.Fragment>
      <div className='spectrum-container'>
      {groceries.map((grocery) => (
            <div className='spectrum-children' key={grocery.id}>
              
              {grocery.item_name}
              
               
                <div 
              ><ExpireCountdown grocery={grocery} />
                </div>
                <div className='spectrum-image'>
                {grocery.type.image ? (
                <img src={grocery.type.image} alt='grocery pic' />
            ) : (
                <img src={fridge} alt='stock fridge' />
            )}
            </div>
            <DeleteGrocery groceries={groceries} grocery={grocery} setGroceries={setGroceries} />
            </div>
          ))}
          </div>
    </React.Fragment>
  );
}
