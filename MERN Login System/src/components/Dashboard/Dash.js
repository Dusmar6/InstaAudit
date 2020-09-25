import React, { useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';


let formData = new FormData();

const Dash = () => {
  
    // const [fileData, setFileData] = useState([]);

    const handleFileChange = event => {
      formData = {'file': event.target.files[0]};
      console.log(formData.file);
      console.log(formData);
    }

    const fileUploadHandler = event => {
      event.preventDefault();
      if(!formData.file) return;
      console.log("Form data is not empty");
      console.log(formData);

      axios.post('http://localhost:5000/api/upload-image', formData, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(response => {
        console.log(response.data);
      }).catch(error => {
        console.log(error.response.data);
      });

    }

    return (
      <div>
        <input type="file" onChange={handleFileChange}/>
        <button className="btn btn-primary" onClick={fileUploadHandler}>Upload</button>
      </div>
    );
}

export default Dash;