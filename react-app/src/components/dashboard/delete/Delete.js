import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';

export const DeleteGrocery = ()=> {
   

  
  
    return (
        <>
            <Button onClick={() => { alert('Grocery Item Deleted') }}>Delete</Button>
        </>
    )
}