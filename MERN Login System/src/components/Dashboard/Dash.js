import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Dash.css';
import auth from '../auth';
import { withRouter } from "react-router-dom";
import jwt from 'jsonwebtoken';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));



const Dash = (props) => {

  console.log(props)
  const [validFlag, setValidFlag] = useState(false);
  const [baseImage, setBaseImage] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [imgName, setImgName] = useState("");
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = data => {

    console.log(`"name": "${imgName}", "img64": "${baseImage}"`)
    axios.post('http://localhost:5000/api/dashboard/upload-image', JSON.parse(`{"name": "${imgName}", "img64": "${baseImage}", "jwt": "${props.session.jwt}"}`)).then(response => {
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
    <div class='container'>

      <div class='input-wrapper'>
        <input class='img-input' form='upload-form' name="img" type="file" title='' ref={register({ validate: validateImage })} onChange={(e) => { uploadImage(e); }} />
         {errors.img && window.alert(errors.img.message)}
        <p class='upload-text'>Upload Image</p>
        <img class='img-display' src={baseImage} />
      </div>
        
      <button class="submit" type="submit" form='upload-form'>Submit</button>
      
      <button class='logout'
        onClick={() => {
          auth.login(() => {
            props.setSession({ jwt: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxMDkyMzcwOTEyMX0.Z6NTR6AhWXJlC9y5GI9pBc_fm3Wc6n7sZYlrdXEOKvY' });
            props.history.push("/");
            localStorage.removeItem('token');
          });
        }}
      > Logout 
      </button>

      <form id='upload-form' class='upload-form' onSubmit={handleSubmit(onSubmit)}/> 

    </div>
  );
}

export default withRouter(Dash);