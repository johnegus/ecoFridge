import React, { useState, useEffect} from 'react'
import { addFreezerGrocery } from '../../../services/groceries';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getFreezerTypes } from '../../../services/types';
import Alert from '@material-ui/lab/Alert';

import './add.css'



const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      zIndex: 0,
    },
  },
}));

export default function AddFreezerGrocery({groceries, setGroceries}) {
  const classes = useStyles();
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState(null);
  const user = localStorage.getItem('userId');
  const [types, setTypes] = useState([]);
  const [errors, setErrors] = useState('');

  

  useEffect(() => {
    (async () => {
    const response = await getFreezerTypes()
    setTypes(response.types)
  })()
  }, [])

  const onAddGrocery = async (e) => {  
      e.preventDefault()  
      if (!itemType ){
        setErrors('Please set an item type.')
        setTimeout(function()
           {
             setErrors('')
           },4000);
      } 
      // if (!itemName){
      //   setErrors('Please give the item a name.')
      //   setTimeout(function()
      //      {
      //        setErrors('')
      //      },4000);
      // }
      else{
      const newGrocery = await addFreezerGrocery(user, itemName, itemType.id);
      const sortedGroceries = [...groceries, newGrocery].sort((a, b) => a.type.days_to_expiry - b.type.days_to_expiry)

      setGroceries(sortedGroceries)
      setItemName('')
      setErrors('')
      setItemType(null)
    }
    
    }

    const onUps = (e, newValue) => {
      
      setItemType(newValue);
    }


  return (
    <form onSubmit={onAddGrocery} className={classes.root} noValidate autoComplete="off">
      <div className='addForm'>
      
      <TextField
          // required
          id="filled-textarea"
          label="Item Name"
          placeholder="Item Name"
          multiline
          variant="filled"
          value={itemName} 
          onChange={e => setItemName(e.target.value)}
        />
        <Autocomplete
        required
        options= {types}
        getOptionLabel= {(option) => option.type}
        id="Item Type"
        debug
        renderInput={(params) => <TextField {...params} label="Item Type" margin="normal" />}
        value={itemType} 
        onChange={onUps}
      />
        <Button type="submit" variant="outlined" color="primary">Add Freezer Item</Button>
        {errors ? <Alert className='fade-out' severity="error">{errors}</Alert> : ''}
      </div>
      
    </form>
  );
}