import React, { useState, useEffect, forceUpdate } from 'react'
import Button from '@material-ui/core/Button';
import { deleteGrocery, getGroceries } from '../../../services/groceries';
import { useParams, useHistory } from "react-router-dom";
import { TableCell } from '@material-ui/core';


export const AddGrocery = ({grocery, groceries, setGroceries})=> {
    const userId = localStorage.getItem('userId')
    const history = useHistory()


    return (
        <>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell align="right">
            <Button onClick={async ()=> {
                              await deleteGrocery(grocery.id)
                              }}>Add</Button>
        </TableCell>
        
        </>
    )
}