import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import '../mini-profile.css'
import { deleteUser, editAvatar } from '../../../services/users';
const useStyles = makeStyles((theme) => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
  }));

export const DeleteUser = ({user})=> {

    

    return (
        <>
        
                
                <div >
                
                  <Button variant="contained" color="primary"
                  onClick={async ()=> {
                    deleteUser(user.id) 
                   
                    window.location.replace('/')
                  
                  }}
                  >Delete Profile</Button>
                  
               
                  
                </div>
             
       
        </>
    )
}