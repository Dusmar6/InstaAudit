import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { withRouter } from "react-router-dom"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { motion } from 'framer-motion';

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
  container: {
    maxWidth: '444px',
    paddingLeft: '24px',
    paddingRight: '24px',
    width: '100%',
    display: 'block',
    boxSizing: 'border-box',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}));

toast.configure()

const SignUp = (props) => {

  const [formData, setFormData] = useState([
    {
      email: null,
      password: null,
      password_confirm: null
    },
  ]);

  const notify = message => {
    toast.error(
      message,
      {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000
      })
  }

  const classes = useStyles();

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (!formData.email) {
      notify("Invlaid Email")
      return;
    }

    if (!formData.password) {
      notify("Please Enter a Password")
      return;
    }
    
    axios.post('http://localhost:5000/api/users/sign-up',
      JSON.parse(`{"email": "${formData.email}", "password": "${formData.password}", "password_confirm": "${formData.password_confirm}"}`))
      .then(response => {
        props.history.push("/users/sign-in")
        console.log(response.data);
      }).catch(error => {
        console.log(error)
        try {
          console.log(error);
          notify(error.response.data.email)
          notify(error.response.data.password)
          notify(error.response.data.password_confirm)
          notify(error.response.data.emailnotfound)
        } catch (e) {
          console.log(e)
          notify("Error Signing Up")
        }
      });

  }

  return (
    <motion.div class={classes.container} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.5}}>
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
          <div style={{ display: 'flex' }}>
            <Button
              type="submit"
              fullWidth variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
              </Button>
              
          </div>
          <Grid container justify='center'>
            <Grid item>
              <Link href="/users/sign-in" color="textSecondary" variant="body2" >
                {"Already registered? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={28}>
        <Copyright />
      </Box>
    </motion.div>
  );
}

export default withRouter(SignUp);