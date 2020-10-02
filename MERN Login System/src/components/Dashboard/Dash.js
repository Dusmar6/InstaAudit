import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Dash.css';
import auth from '../auth';
import { withRouter } from "react-router-dom";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const Dash = props => {

  const [baseImage, setBaseImage] = useState("");
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = data => {

    console.log(`"name": "${data.img[0].name}", "img64": "${baseImage}"`)
    axios.post('http://localhost:5000/api/dashboard/upload-image', JSON.parse(`{"name": "${data.img[0].name}", "img64": "${baseImage}"}`)).then(response => {
        console.log(response.data);
      }).catch(error => {
        console.log(error.response.data);
      });
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };


  const validateImage = async (value) => {
    await sleep(1000);
    let fileName = value[0].name;
    let ext = fileName.substring(fileName.length - 3, fileName.length);
    console.log(fileName);
    console.log(`ext: ${ext}`);
    if (ext.toLowerCase() === "png" || ext.toLowerCase() === "jpg") {
      console.log("png or jpg")
      return true
    }
    else {
      return false || "Invalid file type"
    }
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
};

    return (
      <div>
        <h2>File Upload & Image Preview</h2>
        <div>
          <form  onSubmit={handleSubmit(onSubmit)}>
            <input name="img" type="file" ref={register({validate: validateImage})} onChange={(e) => {uploadImage(e);}} />
              {errors.img && window.alert(errors.img.message)}
            <button type="submit">Submit</button>
          </form>
          <img src={baseImage} height="300px" />
        </div>
        <button 
                onClick={() => {
                    auth.login(() => {
                        props.history.push("/")
                    });
                }}
                >
                  Logout
                </button>
      </div>
    );
}

export default withRouter(Dash);