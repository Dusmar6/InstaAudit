import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
<<<<<<< HEAD
import auth from '../auth'

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

const Dash = props => {
  
    const [fileName, setFileName] = useState(null);

    const handleFileChange = event => {
      setFileName(event.target.files[0]);
    }
=======
import './Dash.css';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const Dash = () => {

  const [baseImage, setBaseImage] = useState("");
  const { handleSubmit, register, errors } = useForm();
>>>>>>> 43b33ebf38194ede5782b0f215f54cdf1129b5d1

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
    if (ext === "png" || ext === "jpg") {
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
<<<<<<< HEAD
        <h1>Dashboard</h1>
        <button onClick={() => {
            auth.logout(() => {
              props.history.push("/");
            })
        }}>Logout</button>
        {/* <input type="file" onChange={handleFileChange}/>
        <button class="btn btn-primary" onClick={fileUploadHandler}>Upload</button> */}
=======
        <h2>File Upload & Image Preview</h2>
        <div>
          <form  onSubmit={handleSubmit(onSubmit)}>
            <input name="img" type="file" ref={register({validate: validateImage})} onChange={(e) => {uploadImage(e);}} />
              {errors.img && window.alert(errors.img.message)}
            <button type="submit">Submit</button>
          </form>
          <img src={baseImage} height="300px" />
        </div>
>>>>>>> 43b33ebf38194ede5782b0f215f54cdf1129b5d1
      </div>
    );
}

export default Dash;