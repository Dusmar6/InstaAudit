import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Dash.css';
import auth from '../auth';
import { withRouter } from "react-router-dom";
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Particles from 'react-particles-js';


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const useStyles = makeStyles((theme) => ({
  
  frame: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '0px',
    backgroundColor: '#fafafa',
    zIndex:'10'
  },
  btn: {
    width: '60%',
    top: '45px',
    left: '74px',
    marginBottom: '10px'
  },
  uploadContainer: {
    position: 'absolute',
    width: '400px',
    height: '460px',
    borderRadius: '20px',
    left: '39%',
    top: '29.5%',
    backgroundColor: 'white',
    border: 'solid 1px',
    opacity: '0.9'
  },
}));

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
// paddingLeft: '30px',
// paddingRight: '30px',
// paddingBottom: '20px',
// paddingTop: '20px',

const Dash = (props) => {

  const classes = useStyles();

  console.log(props)
  const [validFlag, setValidFlag] = useState(false);
  const [baseImage, setBaseImage] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [imgName, setImgName] = useState("");
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = data => {

    console.log(`"name": "${imgName}", "img64": "${baseImage}"`)
    axios.post('http://localhost:5000/api/dashboard/upload-image', JSON.parse(`{"name": "${imgName}", "img64": "${baseImage}", "jwt": "${props.session.jwt}"}`)).then(response => {
      alert(JSON.stringify(response.data));
      console.log(response.data);
    }).catch(error => {
      console.log(error.response.data);
    });
  };
  const uploadImage = async (e) => {
    
    const file = e.target.files[0];
    if (file !== undefined) {
      console.log(e.target.files[0]);
      const base64 = await convertBase64(file);
      setBaseImage(base64);
      setImgName(imgSrc.name);
    }
  };


  const validateImage = async (value) => {
      await sleep(1000);
      if (value[0] !== undefined) {
        let fileName = value[0].name;
        let ext = fileName.substring(fileName.length - 3, fileName.length);
        console.log(fileName);
        console.log(`ext: ${ext}`);
        if (ext.toLowerCase() === "png" || ext.toLowerCase() === "jpg") {
          console.log("png or jpg")
          setValidFlag(true);
          setImgName(fileName);
          return true
        }
        else {
          setValidFlag(false);
          return false || "Invalid file type"
        }
      }
      if (imgName !== '') {
        return true;
      }
      return false;
  }
  
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      try {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        
        fileReader.onload = () => {
          setValidFlag(true);
          const result = fileReader.result;
          setImgSrc(result);
          resolve(result);
        };
        
        fileReader.onerror = (error) => {
          reject(error);
        };
      } catch (error) {
        if(!validFlag) {
          reject(error);
        }
        else {
          if (imgSrc !== "") {
            resolve(imgSrc);
          }
        }
      }

    });
  };

  return (
    <motion.div className={classes.frame} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 1}}>
      <div className={classes.uploadContainer}>
        <div class='input-wrapper'>
          <input class='img-input' form='upload-form' name="img" type="file" title='' ref={register({ validate: validateImage })} onChange={(e) => { uploadImage(e); }} />
          {errors.img && window.alert(errors.img.message)}
          <div className='file-upload'>
            <i class='fa fa-arrow-up'></i>
          </div>
          <img class='img-display' src={baseImage} alt='' />
        </div>
        <Button
            type="submit"
            fullWidth variant="contained"
            color="primary"
            className={classes.btn}
            form='upload-form'
          >
            Audit Image
          </Button>
      <Button 
        className={classes.btn}
        color="primary"
        fullWidth variant="contained"
        onClick={() => {
          auth.login(() => {
            props.setSession({ jwt: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxMDkyMzcwOTEyMX0.Z6NTR6AhWXJlC9y5GI9pBc_fm3Wc6n7sZYlrdXEOKvY' });
            props.history.push("/");
            localStorage.removeItem('token');
          });
        }}
      > Logout 
      </Button>
      </div>
        
      {/* <button class="submit" type="submit" >Submit</button> */}
      

      <form id='upload-form' class='upload-form' onSubmit={handleSubmit(onSubmit)}/> 

      <Particles params={particleParams} style={{ position: 'absolute', zIndex: '-333'}}/>
    </motion.div>
  );
}

export default withRouter(Dash);