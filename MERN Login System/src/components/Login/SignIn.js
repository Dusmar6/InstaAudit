import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './Login.css'; // Sets the background
import axios from 'axios';
import { ThemeContext } from '../contexts/ThemeContext';
import auth from '../auth'
import { withRouter } from "react-router-dom"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Insta Audit
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(38),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
}));

const SignIn = props => {
  console.log('themeContext:');
  
  const [formData, setFormData] = useState([
      {
      email: null,
      password: null
      },
  ]);

  const classes = useStyles();

  const handleInputChange = e => {
      console.log('event.target:', e.target);
      console.log('event.target.value:', e.target.value);
      const { name, value } = e.target
      setFormData(prevState => ({
          ...prevState,
          [name] : value
      }))
  }

  const handleSubmit = e => {
      e.preventDefault();
      if(!formData) return;
      // console.log('Working');
      // console.log(formData.email);
      // console.log(formData.password);
      axios.post('http://localhost:5000/api/users/sign-in', JSON.parse(`{"email": "${formData.email}", "password": "${formData.password}"}`))
      .then(response => {
        console.log(response.data);
      }).catch(error => {
        console.log(error.response.data);
      });
  }
  
  return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
          <Typography component="h1" variant="h5">
          Sign In
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleInputChange}
              value={formData.email}
              autoFocus
          />
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleInputChange}
              value={formData.password}
              autoComplete="current-password"
          />
          <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
          />
          <button 
                onClick={() => {
                    auth.login(() => {
                        props.history.push("/dashboard")
                    });
                }}
          >
            Sign In
          </button>
          <Grid container>
              <Grid item xs>
              <Link href="forgot-password" color="textSecondary" variant="body2">
                  Forgot password?
              </Link>
              </Grid>
              <Grid item>
              <Link href="/users/sign-up"  color="textSecondary" variant="body2">
                  {"Not registered? Sign Up"}
              </Link>
              </Grid>
          </Grid>
          </form>
      </div>
      <Box mt={31}>
          <Copyright />
      </Box>
      </Container>
  );
}

export default withRouter(SignIn);