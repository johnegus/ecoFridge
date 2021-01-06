import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import profile from "../User/Profile.png"
import './mini-profile.css'


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useState({})
  // const [followingNum, setFollowingNum] = useState(0);
  // const [followersNum, setFollowersNum] = useState(0);
  // const [activities, setActivities] = useState(0);
    
    useEffect(() => {
       let user = localStorage.getItem('userId');
        (async () => {
            const response = await fetch(`/api/users/${user}`);
            const userA = await response.json();
            setUser(userA);
            // const response2 = await fetch(`/api/following/users/${user}`)
            // const data = await response2.json();
            // setFollowingNum(data.following.length)
            // setFollowersNum(data.followed.length)
            // const response3 = await fetch(`/api/activities/users/${user}`);
            // const data2 = await response3.json()
            // setActivities(data2.activities.length)
        })()
    }, [])

    const handleClick = (e) => {
        return history.push(`/users/${e.target.id}`)
    }
  return (
    <React.Fragment>
      <div className='miniProfile'>
            {user.avatar ? (
                <img src={user.avatar} alt='user' />
            ) : (
                <img src={profile} alt='stock profile' />
            )}
            <h2 id={user.id} onClick={handleClick}>{user.first_name} {user.last_name}</h2>
            {/* <div className='miniInfo'>
                <div>
                    <h6>Following</h6>
                    <h4>{followingNum}</h4>
                </div>
                <div>
                    <h6>Followers</h6>
                    <h4>{followersNum}</h4>
                </div>
                <div>
                    <h6>Activities</h6>
                    <h4>{activities}</h4>
                </div>
            </div> */}
        </div>
    </React.Fragment>
  );
}



{/* <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}