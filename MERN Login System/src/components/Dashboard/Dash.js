import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

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

const SignIn = () => {
  
    const [fileName, setFileName] = useState(null);

    const handleFileChange = event => {
      setFileName(event.target.files[0]);
    }

    const fileUploadHandler = event => {
      event.preventDefault();
      if(!fileName) return;
      console.log("Form data is not empty");
      console.log(fileName);
      axios.post('http://localhost:5000/api/upload-image', JSON.parse(`{"image": "${fileName}}`))
      .then(response => {
        console.log(response.data);
      }).catch(error => {
        console.log(error.response.data);
      });

    }

    return (
      <div>
        <input type="file" onChange={handleFileChange}/>
        <button class="btn btn-primary" onClick={fileUploadHandler}>Upload</button>
      </div>
    );
}

export default SignIn;