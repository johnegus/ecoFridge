import React, { useState, useEffect} from 'react'
import { addGrocery } from '../../../services/groceries';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function AddGrocery() {
  const classes = useStyles();
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState(null);
  const user = localStorage.getItem('userId');

  const onAddGrocery = async (e) => {
    e.preventDefault();
      const groceryItem = await addGrocery(user, itemName, itemType);
      return groceryItem
    }


  return (
    <form onSubmit={onAddGrocery} className={classes.root} noValidate autoComplete="off">
      <div>
      <TextField
          id="filled-textarea"
          label="Item Name"
          placeholder="Item Name"
          multiline
          variant="filled"
          value={itemName} 
          onChange={e => setItemName(e.target.value)}
        />
        <TextField
          id="filled-textarea"
          label="Item Type"
          placeholder="Item Type"
          multiline
          variant="filled"
          value={itemType} 
          onChange={e => setItemType(e.target.value)}
        />
        <Button type="submit">Add Grocery Item</Button>
      </div>
    </form>
  );
}
