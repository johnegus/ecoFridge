import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Title from './Title';
import './mini-profile.css'
import { getGroceries } from '../../services/groceries';
import { DeleteGrocery } from './delete/Delete';
import AddGrocery from './addItem/Add';
import { DateDiffInDays } from './dateDiffer/DateDiffInDays';
import { ExpireCountdown } from './dateDiffer/ExpireCountdown';
import { Grid } from '@material-ui/core';
import { GridMaker } from './data-grid/Grid';


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders({groceries, setGroceries}) {
  const classes = useStyles();
  const year = new Date().getFullYear();
  const month =new Date().getMonth() + 1;
  const date = new Date().getDate()



  return (
    <React.Fragment>
      <div className={classes.seeMore}>
        <Link color="primary" href="/add" onClick={<AddGrocery />}>
          Add more Groceries
        </Link>
      </div>
      Today is {month + '/' + date + '/' + year}
      <AddGrocery groceries={groceries} setGroceries={setGroceries}/>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date Purchased</TableCell>
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
              <TableCell>{grocery.item_name}</TableCell>
              <TableCell>{grocery.type.type}</TableCell>
              <TableCell><ExpireCountdown grocery={grocery} /> </TableCell>
              <TableCell align="right"><DeleteGrocery groceries={groceries} grocery={grocery} setGroceries={setGroceries} /></TableCell>
            </TableRow>
          ))}
          
            
          
        </TableBody>
      </Table>
            
      
      <GridMaker groceries={groceries} />
    </React.Fragment>
  );
}
