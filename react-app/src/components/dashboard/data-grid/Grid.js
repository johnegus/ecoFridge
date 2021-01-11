import React, { useState, useEffect, forceUpdate } from 'react'
import Button from '@material-ui/core/Button';
import { deleteGrocery, getGroceries } from '../../../services/groceries';
import { useParams, useHistory } from "react-router-dom";
import { DataGrid } from '@material-ui/data-grid';
import { DateDiffInDays } from '../dateDiffer/DateDiffInDays';
import { ExpireCountdown } from '../dateDiffer/ExpireCountdown';


export const GridMaker = ({grocery, groceries, setGroceries})=> {
    const userId = localStorage.getItem('userId')
    const [rows, setRows] = useState([]);

    useEffect(() => {
        (async () => {
    const  mapHistoryToRows = () => {
      
      const gridRows = groceries.map((grocery) => {
        return ({
          id: grocery.id,
          date: grocery.createdAt,
          days_passed: <DateDiffInDays grocery={grocery} />,
          item: grocery.item_name,
          type: grocery.type.type,
          days_to_expiry: <ExpireCountdown grocery={grocery} />
        })
  
      })
      setRows(gridRows);
      console.log('Rows: ', rows)
    }
    mapHistoryToRows();
})()
}, [])

    const columns = [
        { field: 'date', headerName: 'Date'},
        { field: 'days_passed', headerName: 'Days Passed'},
        { field: 'item', headerName: 'Item Name'},
        { field: 'type', headerName: 'Type' },
        { field: 'days_to_expiry', headerName: 'Expires'},
        
      ];

    return (
      
             <div style={{ height: 500}}>
      <DataGrid rows={rows} columns={columns} pageSize={20} checkboxSelection />
      </div>
       
    )
}