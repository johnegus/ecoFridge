import React, { useState, useEffect } from 'react'
import { NavLink, useLocation, Redirect } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import LogoutButton from './auth/LogoutButton';
import styled from 'styled-components'
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import Link from '@material-ui/core/Link';

import RecipeSearchInput from './recipe-search/RecipeSearchInput';
import logo from '../ecofridge.png'



const Nav = styled.nav`
max-height: 80px;
border-bottom: solid 1px #f0f0f5;
text-decoration: none;
position: -webkit-sticky; /* Safari */
position: sticky;
top: 0;
z-index: 25;
background-color: white;
/* overflow: hide; */
/* background-color: black; */
`
const NavContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
text-decoration: none;
margin: 0 auto;
`



const Logo = styled.img.attrs({
  src: logo
})`
width: 80px;
height: 80px;
margin: 0 auto;
display: flex;
`

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/john-hiestand-3bb22a17/">
        John Hiestand
      </Link>{''}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    // background: 'rgb(250,2,2)',
    // background: 'linear-gradient(90deg, rgba(250,2,2,1) 0%, rgba(10,121,158,1) 50%, rgba(0,255,139,1) 100%)'
  },
  fixedHeight: {
    height: 240,
  },
}));
const NavBar = ({ authenticated, setAuthenticated }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  let location = useLocation();
  const [userId, setUserId] = useState()
  const currentPage = location.pathname;
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  // const userId = localStorage.getItem('userId');
  useEffect(() => {
    let user = localStorage.getItem('userId');
    setUserId(user);
  }, [])

  return (
    <>
    <Nav>
      <NavContainer>
      {authenticated ? <RecipeSearchInput /> : ''}
      {authenticated ? <NavLink to="/dashboard" exact={true} activeClassName="active">
          <Logo />
        </NavLink> : 
        <NavLink to="/" exact={true} activeClassName="active">
        <Logo />
      </NavLink>}

        
      <ul>
          {!authenticated && currentPage !== '/login' ? 
        <>
              <NavLink to="/login" exact={true} activeClassName="active">
                <Button variant="outlined" color="primary">
                  Login
                </Button>
            </NavLink>
        </>
            : ""}
          {!authenticated && currentPage !== '/sign-up' ? 
            <>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
                <Button variant="outlined" color="primary">
                  Sign Up
                </Button>
            </NavLink>
            </>
            : "" }
          {authenticated ? 
          <>
            <NavLink to={`/dashboard`} exact={true} activeClassName="active">
            <Button variant="outlined" color="primary">
                Dashboard
              </Button>
            </NavLink>
            <NavLink to={`/database`} exact={true} activeClassName="active">
            <Button variant="outlined" color="primary">
                Database
              </Button>
            </NavLink>
            <LogoutButton setAuthenticated={setAuthenticated} />
          </>
            : ""}
        </ul>
        </NavContainer>
        </Nav>
   
    </>
  );
}

export default NavBar;