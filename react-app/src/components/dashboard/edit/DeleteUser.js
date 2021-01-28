import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import '../mini-profile.css'
import { deleteUser, editAvatar } from '../../../services/users';


export const DeleteUser = ({user})=> {


    return (
        <>
        
                
                <div >
                {user.email !== "demo@aa.io" ? 
                  <Button variant="contained" color="primary"
                  onClick={async ()=> {
                    deleteUser(user.id) 
                   
                    window.location.replace('/')
                  
                  }}
                  >Delete Account</Button>
                : ''}
               
                  
                </div>
             
       
        </>
    )
}