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
import './mini-profile.css'


export default function Chart({groceries, setGroceries}) {
const [modalIsOpen, setModalIsOpen] = useState(false)
const [currentGrocery, setCurrentGrocery] = useState('')

const handleClick = async (grocery) => {
  await setCurrentGrocery('tumeric');
  console.log(currentGrocery)
  await setModalIsOpen(true)   
}

  return (
    <React.Fragment>
      <div className='spectrum-container'>
      {groceries.map((grocery) => (
            <div className='spectrum-children' key={grocery.id} onClick={handleClick}>
              
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
          <Modal 
          isOpen={modalIsOpen} 
          onRequestClose={() => setModalIsOpen(false)}
          style={
            {
            content: {
              background: 'linear-gradient(7deg, rgba(2,0,36,1) 0%, rgba(212,212,228,0.48921566917782733) 34%, rgba(0,212,255,1) 100%)', 
              position: 'absolute',
              top: '140px',
              left: '340px',
              right: '140px',
              bottom: '140px',
              border: '1px solid #ccc',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px'
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
