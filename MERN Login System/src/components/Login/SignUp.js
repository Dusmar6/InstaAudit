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
import Particles from 'react-particles-js';

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
  "retina_detect": false
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
  },
  frame: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '0px'
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
    <motion.div classes={classes.frame} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 1}}>
    <div class={classes.container}>
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
    </div>
    <Particles params={particleParams} style={{marginTop: '-900px', position: 'absolute', zIndex: '-1'}}/>
    </motion.div>
  );
}

export default withRouter(SignUp);