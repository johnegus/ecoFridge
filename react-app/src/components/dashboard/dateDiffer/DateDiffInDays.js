import React, { useState, useEffect, forceUpdate } from 'react'
import Button from '@material-ui/core/Button';
import { deleteGrocery, getGroceries } from '../../../services/groceries';


export const DateDiffInDays = ({grocery})=> {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    // a and b are javascript Date objects
    function dateDiffInDays(a, b) {
      // Discard the time and time-zone information.
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        console.log(Math.floor((utc2 - utc1) / _MS_PER_DAY))
      return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }
    
    // test it
    const a = new Date(grocery.createdAt),
        b = new Date(),
        difference = dateDiffInDays(a, b);
    return (
        <>
            {difference}
        </>
    )
}