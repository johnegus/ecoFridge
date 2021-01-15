import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { editGrocery } from '../../../services/groceries';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
  }));

export const EditGrocery = ({grocery, groceries, setGroceries})=> {
    const classes = useStyles();
    const [isEdit, setIsEdit] = useState(false)
    const [itemName, setItemName] = useState("");

    const onEdit = () => {
        setIsEdit(true)
      }

      const onCancel = () => {
        setIsEdit(false)
      }
    
      const onEditSubmit = async (e) => {
        e.preventDefault()  
        console.log('Grocery id: ', grocery.id, 'Item name: ', itemName)
        const newGrocery = await editGrocery(grocery.id, itemName);
        const newGroceries = groceries.map(item => item.id === grocery.id ? newGrocery: item)
        // const sortedGroceries = [...groceries, newGrocery].sort((a, b) => a.type.days_to_expiry - b.type.days_to_expiry)
    
        setGroceries(newGroceries)
        setItemName('')
        setIsEdit(false)
      }

    return (
        <>
            {isEdit ?
                
                <div>
                  <form onSubmit={onEditSubmit} className={classes.root} noValidate autoComplete="off">
                  <TextField
                    id="filled-textarea"
                    label="Item Name"
                    placeholder="Item Name"
                    multiline
                    variant="filled"
                    value={itemName} 
                    onChange={e => setItemName(e.target.value)}
                  />
                  <Button type="submit" variant="outlined" color="primary">Save</Button>
                  </form>
                  <Button variant="outlined" color="secondary"  onClick={async ()=> {
                            onCancel()
                            }}>Cancel
                </Button>
                </div>
              
                : grocery.item_name
                
              }
              {isEdit ? '':
              <Button variant="outlined" color="secondary"  onClick={async ()=> {
                            onEdit()
                            }}>Edit
                </Button>
}
        </>
    )
}