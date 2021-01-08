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
import { DataGrid } from '@material-ui/data-grid';
import { DateDiffInDays } from './dateDiffer/DateDiffInDays';


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
  const [rows, setRows] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [groceries, setGroceries] = useState([]);
  const userId = localStorage.getItem('userId') 
  const year = new Date().getFullYear();
  const month =new Date().getMonth() + 1;
  const date = new Date().getDate()

  useEffect(() => {
    (async () => {
    const response = await getGroceries(userId)
    setGroceries(response.groceries)
    await setTimeout(function(){ setLoaded(true); }, 500);
    // const  mapHistoryToRows = () => {

    //   if (!loaded) {
    //     return;
    //   }
      
    //   const gridRows = groceries.map((grocery) => {
    //     return ({
    //       id: grocery.id,
    //       date: grocery.createdAt, 
    //       item: grocery.item_name,
    //       type: grocery.type.type,
    //       days_to_expiry: grocery.type.days_to_expiry
    //     })
  
    //   })
    //   setRows(gridRows);
    //   console.log('Rows: ', rows)
    // }
    // mapHistoryToRows();
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
  

      // const columns = [
      //   { field: 'date', headerName: 'Date', width: 130 },
      //   { field: 'item', headerName: 'item', width: 130 },
      //   { field: 'type', headerName: 'type', width: 130 },
      //   { field: 'days_to_expiry', headerName: 'days_to_expiry', width: 90 },
        
      // ];

  return (
    <React.Fragment>
      
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
              <TableCell><DateDiffInDays grocery={grocery}/></TableCell>
              <TableCell>{grocery.item_name}</TableCell>
              <TableCell>{grocery.type.type}</TableCell>
              <TableCell> 
                <div className={
                grocery.type.days_to_expiry  < 7 
                ? 'dayslow' : 'oversevendays'
              }>{grocery.type.days_to_expiry} days
                </div>
              </TableCell>
              <TableCell align="right"><DeleteGrocery groceries={groceries} grocery={grocery} setGroceries={setGroceries} /></TableCell>
            </TableRow>
          ))}
          
            
          
        </TableBody>
      </Table>
      {/* <div style={{ width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={20} checkboxSelection />
      </div> */}
      <div className={classes.seeMore}>
        <Link color="primary" href="/add" onClick={<AddGrocery />}>
          Add more Groceries
        </Link>
      </div>
      Today is {month + '/' + date + '/' + year}
      <AddGrocery groceries={groceries} setGroceries={setGroceries}/>
      
    </React.Fragment>
  );
}
