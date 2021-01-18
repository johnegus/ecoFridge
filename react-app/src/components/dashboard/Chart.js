import React, { useState, useEffect } from 'react';

import './mini-profile.css'

import fridge from '../dashboard/fridge.png';
import { DeleteGrocery } from './delete/Delete';
import { ExpireCountdown } from './dateDiffer/ExpireCountdown';
import Modal from 'react-modal'
import RecipeSearch from '../recipe-search/RecipeSearch';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import { makeStyles } from '@material-ui/core/styles';

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

export default function Chart({groceries, setGroceries}) {
const [modalIsOpen, setModalIsOpen] = useState(false)
const [currentGrocery, setCurrentGrocery] = useState('')
const [checked, setChecked] = useState(false)
const [sortedGroceries, setSortedGroceries] = useState([])
const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}


useEffect(() => {
  (async () => {
if (groceries) {
  setChecked(true)
  const sorted = groceries.sort((groceryA, groceryB) => {
    const a = new Date(groceryA.createdAt),
    b = new Date(),
    difference = dateDiffInDays(a, b);
    const c = new Date(groceryB.createdAt),
    d = new Date(),
    difference2 = dateDiffInDays(c, d);
  
    return (groceryA.type.days_to_expiry -difference) - (groceryB.type.days_to_expiry - difference2)
    
  })
  setSortedGroceries(sorted)
}
})()
}, [groceries])

const handleClick = (grocery) => {
  console.log(grocery)
  setCurrentGrocery(grocery.item_name);
  setModalIsOpen(true)   
}

  return (
    <React.Fragment>
      <div className='spectrum-container'>
      {sortedGroceries.map((grocery) => (
        <Slide elevation={4} direction="up" in={checked} mountOnEnter unmountOnExit>
         
            <div className='spectrum-children' key={grocery.id} >
              
              {grocery.item_name}
              
               
                <div 
              ><ExpireCountdown grocery={grocery} />
                </div>
                <div className='spectrum-image' onClick={() => handleClick(grocery)}>
                {grocery.type.image ? (
                <img src={grocery.type.image} alt='grocery pic' />
            ) : (
                <img src={fridge} alt='stock fridge' />
            )}
            </div>
            {/* <DeleteGrocery groceries={groceries} grocery={grocery} setGroceries={setGroceries} /> */}
            </div>
        
            </Slide>
          ))}
          <Modal 
          isOpen={modalIsOpen} 
          onRequestClose={() => setModalIsOpen(false)}
          closeTimeoutMS={500}
          style={
            {
            content: {
              background: 'linear-gradient(7deg, rgba(2,0,36,1) 0%, rgba(212,212,228,0.48921566917782733) 34%, rgba(0,212,255,1) 100%)', 
              position: 'absolute',
              top: '20%',
              left: '1%',
              right: '1%',
              bottom: '5%',
              border: '1px solid #ccc',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '5px',
              outline: 'none',
              padding: '20px',
              zIndex: '30',
            }
          }
          }
          >
            <div className='closeIcon'>
              <CloseIcon onClick={() => setModalIsOpen(false)}>Close</CloseIcon>
            </div>
            <RecipeSearch currentGrocery={currentGrocery}/>
            
          </Modal>
          </div>
          
    </React.Fragment>
  );
}
