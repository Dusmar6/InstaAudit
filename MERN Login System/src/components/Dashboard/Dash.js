import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import FormData from 'form-data';


let data = new FormData();

const Dash = () => {
  
    const [fileData, setFileData] = useState(null);

    const handleFileChange = event => {
      setFileData(event.target.files[0]);
      
      data.append('file', fileData);
    }

    const fileUploadHandler = event => {
      event.preventDefault();
      if(!fileData) return;
      console.log("Form data is not empty");
      console.log(fileData);

      let headers = {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      }
      axios.post('http://localhost:5000/api/upload-image', fileData, headers)
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

export default Dash;