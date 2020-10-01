import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './Login.css'; // Sets the background
import axios from 'axios';
import ToggleSwitch from './ToggleSwitch';
import styled from "styled-components";

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

const theme = {
  blue: {
    default: "#3f51b5",
    hover: "#283593"
  },
  pink: {
    default: "#e91e63",
    hover: "#ad1457"
  }
};

const SignUp = () => {

    const [formData, setFormData] = useState([
        {
        email: null,
        password: null,
        password_confirm: null
        },
    ]);

    const classes = useStyles();

    const handleInputChange = e => {
        // console.log('event.target:', e.target);
        // console.log('event.target.value:', e.target.value);
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
        let response = axios.post('http://localhost:5000/api/users/sign-up', 
        JSON.parse(`{"email": "${formData.email}", "password": "${formData.password}", "password_confirm": "${formData.password_confirm}"}`))
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
            Sign Up
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
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password_confirm"
                label="Confirm Password"
                type="password"
                id="password"
                onChange={handleInputChange}
                value={formData.password_confirm}
            />
            <div style={{display:'flex'}}>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    Sign Up
              </Button>
              <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
              />
            </div>
            </form>
        </div>
        <Box mt={28}>
            <Copyright />
        </Box>
        </Container>
    );
}

export default SignUp;