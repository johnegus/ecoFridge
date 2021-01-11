import React, { useState, useEffect, forceUpdate } from 'react'
import Button from '@material-ui/core/Button';
import { deleteGrocery, getGroceries } from '../../../services/groceries';
import { useParams, useHistory } from "react-router-dom";
import { DataGrid } from '@material-ui/data-grid';
import { DateDiffInDays } from '../dateDiffer/DateDiffInDays';
import { ExpireCountdown } from '../dateDiffer/ExpireCountdown';
import { DeleteGrocery } from '../delete/Delete';


export const GridMaker = ({grocery, groceries, setGroceries})=> {
    const userId = localStorage.getItem('userId')
    const [rows, setRows] = useState([]);
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    // a and b are javascript Date objects
    function dateDiffInDays(a, b) {
      // Discard the time and time-zone information.
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      console.log(Math.floor((utc2 - utc1) / _MS_PER_DAY))
      return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    useEffect(() => {
        (async () => {
    const  mapHistoryToRows = () => {
      
      const gridRows = groceries.map((grocery) => {
        const a = new Date(grocery.createdAt),
        b = new Date(),
        difference = dateDiffInDays(a, b);
        return ({
          id: grocery.id,
          date: grocery.createdAt,
          days_passed: difference,
          item: grocery.item_name,
          type: grocery.type.type,
          days_to_expiry: grocery.type.days_to_expiry - difference
        }
        )
  
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