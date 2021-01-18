import React, { useState, useEffect, forceUpdate } from 'react'

import { DataGrid } from '@material-ui/data-grid';



export const GridMaker = ({types})=> {
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
      
      const gridRows = types.map((type) => {
      
        return ({
          id: type.id,
          type: type.type,
          days_to_expiry: type.days_to_expiry,
          
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
        { field: 'id', headerName: 'ID'},
        { field: 'type', headerName: 'Type', width: 700 },
        { field: 'days_to_expiry', headerName: 'Expires', width: 200 },
        
        
      ];

    return (
      
             <div style={{ height: 500}}>
      <DataGrid rows={rows} columns={columns} pageSize={50} checkboxSelection />
      </div>
       
    )
}