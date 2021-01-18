import React, { useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Title from '../Title';
import '../mini-profile.css'

import { DeleteGrocery } from '../delete/Delete';
import AddGrocery from '../addItem/Add';
import { DateDiffInDays } from '../dateDiffer/DateDiffInDays';
import { ExpireCountdown } from '../dateDiffer/ExpireCountdown';

import Modal from 'react-modal'
import RecipeSearch from '../../recipe-search/RecipeSearch';
import CloseIcon from '@material-ui/icons/Close';


import { EditGrocery } from '../edit/Edit';




function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Freezer({freezerGroceries,}) {
  const classes = useStyles();
  const year = new Date().getFullYear();
  const month =new Date().getMonth() + 1;
  const date = new Date().getDate()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [currentGrocery, setCurrentGrocery] = useState('')
  



  
  const handleTypeClick = (grocery) => {
    console.log(grocery)
    setCurrentGrocery(grocery.type.type);
    setModalIsOpen(true)   
  }



 

  return (
    <React.Fragment>
      <div className={classes.seeMore}>
      <Title>Add More Groceries</Title>
          
 
      </div>
  
      <AddGrocery groceries={groceries} setGroceries={setGroceries}/>
      <Title>Groceries</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date Stored</TableCell>
            <TableCell>Days Passed</TableCell>
            <TableCell>Item Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Expires</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groceries.map((grocery) => (
            <TableRow key={grocery.id}>
              <TableCell>{grocery.createdAt}</TableCell>
              <TableCell><DateDiffInDays grocery={grocery} /></TableCell>
              <TableCell>
                <EditGrocery grocery={grocery} groceries={groceries} setGroceries={setGroceries}/>
              </TableCell>
              <TableCell onClick={() => handleTypeClick(grocery)}>{grocery.type.type}</TableCell>
              <TableCell><ExpireCountdown grocery={grocery} /> </TableCell>
              <TableCell align="right"><DeleteGrocery groceries={groceries} grocery={grocery} setGroceries={setGroceries} /></TableCell>
            </TableRow>
          ))}
          
            
          
        </TableBody>
      </Table>
            
      
      
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
          
    </React.Fragment>
  );
}