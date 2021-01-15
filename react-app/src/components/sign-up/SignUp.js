import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { signUp } from '../../services/auth';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
      John Hiestand
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({authenticated, setAuthenticated}) {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] =useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(firstName, lastName, city, country, email, password);
      if (!user.errors) {
        
        localStorage.setItem('userId', user.id);
        setAuthenticated(true);
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateCity = (e) => {
    setCity(e.target.value);
  }

  const updateCountry = (e) => {
    setCountry(e.target.value);
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateAvatar = (e) => {
    setAvatar(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={onSignUp}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="first_name"
                onChange={updateFirstName}
                value={firstName}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="last_name"
                onChange={updateLastName}
                value={lastName}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={updateEmail}
                value={email}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                onChange={updateCity}
                value={city}
                autoComplete="city"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="country"
                label="Country"
                name="country"
                onChange={updateCountry}
                value={country}
                autoComplete="country"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                onChange={updatePassword}
                value={password}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="avatar"
                onChange={updateAvatar}
                value={avatar}
                label="Avatar"
                
                id="avatar"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box sx={{ mt: 5 }}>
        <Copyright />
      </Box>
    </Container>
  );
}
