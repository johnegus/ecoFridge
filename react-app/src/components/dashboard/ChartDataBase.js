import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Title from './Title';
import './mini-profile.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import fridge from '../dashboard/fridge.png';
import { DeleteGrocery } from './delete/Delete';
import { ExpireCountdown } from './dateDiffer/ExpireCountdown';
import Modal from 'react-modal'
import RecipeSearch from '../recipe-search/RecipeSearch';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import {Bar} from 'react-chartjs-2';

import './mini-profile.css'
const useStyles = makeStyles((theme) => ({
  root: {
    height: 180,
  },
  wrapper: {
    width: 100 + theme.spacing(2),
  },
  paper: {
    background: 'white',
    position: 'relative',
    margin: theme.spacing(1),
    borderRadius: '5px'
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
}));



export default function ChartDataBase({types}) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false)
  const [stockChartXValues, setstockChartXValues] = useState([]);
  const [stockChartYValues, setstockChartYValues] = useState([]);

  useEffect(() => {
    (async () => {
        let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
  if (types) {
    
    setChecked(true)
    types.map((type) => {
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
        label: 'Item Types',
        backgroundColor: 'white',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: stockChartYValues
      }
    ]
  };
  return (
    <React.Fragment>
      <div className='spectrum-container2'>
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
         
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
          </div>
          
    </React.Fragment>
  );
}