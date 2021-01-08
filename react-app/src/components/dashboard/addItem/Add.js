import React, { useState, useEffect} from 'react'
import { addGrocery, getGroceries } from '../../../services/groceries';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getTypes } from '../../../services/types';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function AddGrocery({groceries, setGroceries}) {
  const classes = useStyles();
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState(null);
  const user = localStorage.getItem('userId');
  const [loaded, setLoaded] = useState(false);
  const [types, setTypes] = useState([]);
  

  useEffect(() => {
    (async () => {
    const response = await getTypes()
    setTypes(response.types)
    // setTimeout(function(){ setLoaded(true); }, 500);
    setLoaded(true);
  })()
  }, [])
  const defaultProps = {
    options: types,
    getOptionLabel: (option) => option.type,
  };

  const onAddGrocery = async (e) => {
      console.log('user: ' + user + 'itemName: ' + itemName + 'itemtype: '+ itemType)
    
      await addGrocery(user, itemName, itemType);
      const response = await getGroceries(user)
      setGroceries(response.groceries)
    
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
        {/* <TextField
          id="filled-textarea"
          label="Item Type"
          placeholder="Item Type"
          multiline
          variant="filled"
          value={itemType} 
          onChange={e => setItemType(e.target.value)}
        /> */}
        <Autocomplete
        {...defaultProps}
        id="Item Type"
        debug
        renderInput={(params) => <TextField {...params} label="Item Type" margin="normal" />}
        value={itemType} 
        onChange={e => setItemType(e.target.value)}
      />
        <Button type="submit">Add Grocery Item</Button>
      </div>
    </form>
  );
}
