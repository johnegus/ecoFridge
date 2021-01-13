import React, { useState, useEffect } from 'react'
import { NavLink, useLocation, Redirect } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
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
    src: '../../ecofridge.png'
})`
width: 80px;
height: 80px;
margin: 0 auto;
display: flex;
`
const NavBar = ({ authenticated, setAuthenticated }) => {
  let location = useLocation();
  const [userId, setUserId] = useState()
  const currentPage = location.pathname;


  // const userId = localStorage.getItem('userId');
  useEffect(() => {
    let user = localStorage.getItem('userId');
    setUserId(user);
  }, [])

  return (
    <Nav>
      <NavContainer>
        <NavLink to="/" exact={true} activeClassName="active">
          <Logo />
        </NavLink>
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
            {/* <NavLink to="/groceries/new" exact={true} activeClassName="active">
              <Buttons>
                Buy Groceries
              </Buttons>
            </NavLink> */}
            <NavLink to={`/users/${userId}`} exact={true} activeClassName="active">
            <Button variant="outlined" color="primary">
                Profile
              </Button>
            </NavLink>
            <LogoutButton setAuthenticated={setAuthenticated} />
          </>
            : ""}
        </ul>
        </NavContainer>
    </Nav>
  );
}

export default NavBar;