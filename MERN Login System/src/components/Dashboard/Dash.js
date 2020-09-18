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
    // console.log('themeContext:');
  
    const [fileName, setFileName] = useState(null);
    // const [formData, setFormData] = useState([
    //   {
    //     filename: null,
    //     file: null
    //   },
    // ]);


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
        // <div class="container">
        // <div class="row">
        //     <div class="col-sm-8 mt-3">

        //     <form class="mt-4"
        //         method="POST"
        //         enctype="multipart/form-data"
        //     >
        //         <div class="form-group">
        //         <input
        //             type="file"
        //             name="file"
        //             id="input-files"
        //             class="form-control-file border"
        //         />
        //         </div>
        //         <button type="submit" class="btn btn-primary" onSubmit={handleSubmit}>Submit</button>
        //     </form>
        //     </div>
        // </div>
        // <hr />
        // <div class="row">
        //     <div class="col-sm-12">
        //     <div class="preview-images"></div>
        //     </div>
        // </div>
        // </div>
    );
}

export default SignIn;