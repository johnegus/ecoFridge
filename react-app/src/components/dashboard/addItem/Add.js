import React, { useState, useEffect} from 'react'
import { addGrocery, getGroceries } from '../../../services/groceries';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getTypes } from '../../../services/types';
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

export default function AddGrocery({groceries, setGroceries}) {
  const classes = useStyles();
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState(null);
  const user = localStorage.getItem('userId');
  const [loaded, setLoaded] = useState(false);
  const [types, setTypes] = useState([]);
  const [errors, setErrors] = useState('');

  

  useEffect(() => {
    (async () => {
    const response = await getTypes()
    setTypes(response.types)
    setTimeout(function(){ setLoaded(true); }, 500);
    setLoaded(true);
  })()
  }, [])

  const onAddGrocery = async (e) => {  
      e.preventDefault()  
      if (!itemType){
        setErrors('No Item Type Found')
        setTimeout(function()
           {
             setErrors('')
           },2000);
      } else{
      const newGrocery = await addGrocery(user, itemName, itemType.id);
      const sortedGroceries = [...groceries, newGrocery].sort((a, b) => a.type.days_to_expiry - b.type.days_to_expiry)

      setGroceries(sortedGroceries)
      setItemName('')
      setErrors('')
      setItemType(null)
    }
    
    }

    const onUps = (e, newValue) => {
      console.log('///', newValue);
      
      setItemType(newValue);
    }


  return (
    <form onSubmit={onAddGrocery} className={classes.root} noValidate autoComplete="off">
      <div className='addForm'>
      
      <TextField
          required
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
        required
        options= {types}
        getOptionLabel= {(option) => option.type}
        id="Item Type"
        debug
        renderInput={(params) => <TextField {...params} label="Item Type" margin="normal" />}
        value={itemType} 
        onChange={onUps}
      />
        <Button type="submit" variant="outlined" color="primary">Add Grocery Item</Button>
        {errors ? <Alert className='fade-out' severity="error">{errors}</Alert> : ''}
      </div>
      
    </form>
  );
}
