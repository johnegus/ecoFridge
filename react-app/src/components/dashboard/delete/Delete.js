import React, { useState, useEffect, forceUpdate } from 'react'
import Button from '@material-ui/core/Button';
import { deleteGrocery, getGroceries } from '../../../services/groceries';
import { useParams, useHistory } from "react-router-dom";


export const DeleteGrocery = ({grocery, groceries, setGroceries})=> {
    const userId = localStorage.getItem('userId')
    


    return (
        <>
            <Button variant="outlined" color="primary" onClick={async ()=> {
                              await deleteGrocery(grocery.id)
                              const response = await getGroceries(userId)
                              const sortedGroceries = response.groceries.sort((a, b) => a.type.days_to_expiry - b.type.days_to_expiry)
                                setGroceries(sortedGroceries)
                              }}>Delete</Button>
        </>
    )
}