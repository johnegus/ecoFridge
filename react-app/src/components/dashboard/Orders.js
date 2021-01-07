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
import { AddGrocery } from './addItem/Add';


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();

  const [loaded, setLoaded] = useState(false);
  const [groceries, setGroceries] = useState({});
  const userId = localStorage.getItem('userId') 

  useEffect(() => {
    (async () => {
    const response = await getGroceries(userId)
    setGroceries(response.groceries)
    setTimeout(function(){ setLoaded(true); }, 500);
  })()
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
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date Purchased</TableCell>
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
              <TableCell>{grocery.item_name}</TableCell>
              <TableCell>{grocery.type.type}</TableCell>
              <TableCell> 
                <div className={
                grocery.type.days_to_expiry < 7 
                ? 'dayslow' : 'oversevendays'
              }>{grocery.type.days_to_expiry} days
                </div>
              </TableCell>
              <TableCell align="right"><DeleteGrocery groceries={groceries} grocery={grocery} setGroceries={setGroceries} /></TableCell>
            </TableRow>
          ))}
          <TableRow>
            <AddGrocery />
          </TableRow>
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
