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
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import Particles from 'react-particles-js';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Insta Audit
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}
const particleParams = {
  "particles": {
    "number": {
      "value": 100,
      "density": {
        "enable": true,
        "value_area": 1000
      }
    },
    "color": {
      "value": "#000000"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 12
      },
      "image": {
        "src": "img/github.svg",
        "width": 0,
        "height": 0
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 0,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#000000",
      "opacity": 0.5,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 1122.388442605866,
        "rotateY": 561.194221302933
      }
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": false,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "repulse": {
        "distance": 80,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(38),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '20px',
    paddingLeft: '30px',
    paddingRight: '30px',
    paddingBottom: '20px',
    paddingTop: '20px',
    backgroundColor: 'white'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(1, 0, 2)
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
  },
  frame: {
    position: 'relative',
    width: '100%',
    height: '100%',
    top: '0px'
  }
}));

toast.configure()

const SignIn = (props) => {

  // Initialize the login form data
  const [formData, setFormData] = useState([
    {
      email: null,
      password: null,
      checked: false
    },
  ]);

  const classes = useStyles();

  // Updates the email/ password fields in the login form  
  const handleInputChange = e => {
    console.log('event.target:', e.target);
    console.log('event.target.value:', e.target.value);
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  // Updates the "Remember me" boolean in the login form
  const handleChecked = e => {
    console.log(e.target.checked);
    const { name, checked } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: checked
    }))
  }

  // Submission of login form
  const handleSubmit = e => {
    e.preventDefault();
    
    if (!formData.email) {
      notify("Please Enter an Email Address")
      return;
    }

    if (!formData.password) {
      notify("Please Enter an Email Address")
      return;
    }

    axios.post('http://localhost:5000/api/users/sign-in', JSON.parse(`{"email": "${formData.email}", "password": "${formData.password}"}`))
      .then(response => {
        // Assigns the session variables when the user logs in
        props.setSession({ jwt: response.data.token });
        console.log(formData.checked);
        // Store token/ uid to local storage on login if "Remember me" is checked
        if(formData.checked) { 
          localStorage.setItem('token', response.data.token); 
        } 
         
        
        props.history.push({
          pathname: "/api/dashboard"
        })
      }).catch(error => {
        console.log(error);
        notify(error.response.data.email);
        notify(error.response.data.password);
        notify(error.response.data.passwordincorrect);
      });
  }

  const notify = message => {
    toast.error(
      message,
      {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000
      })
  }

  return (
    // <motion.div class={classes.container} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.5}}>
    <motion.div class={classes.frame} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 1}}>

      <div class={classes.container}>
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
            control={<Checkbox name="checked" id="checked" onChange={handleChecked} color="primary" />}
            label="Remember me" 
          />
          <Button
            type="submit"
            fullWidth variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgot-password" color="textSecondary" variant="body2">
                {'Forgot password'}
              </Link>
            </Grid>
            <Grid item>
              <Link href="/users/sign-up" color="textSecondary" variant="body2">
                {"Not registered? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={31}>
        <Copyright />
      </Box>
      </div>
    <Particles params={particleParams} style={{marginTop: '-950px', position: 'absolute', zIndex: '-1'}}/>
    </motion.div>
  );
};

export default withRouter(SignIn);