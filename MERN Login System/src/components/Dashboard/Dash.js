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
    console.log('themeContext:');
  

    const [formData, setFormData] = useState([
        {
        email: null,
        password: null
        },
    ]);

    const handleInputChange = e => {
        console.log('event.target:', e.target);
        console.log('event.target.value:', e.target.value);
        const { filename, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [filename] : value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(!formData) return;
        console.log('Working');
        console.log(formData.data);
        axios.post('http://localhost:5000/api/dashboard', JSON.parse(`{"image": "${formData.email}", "password": "${formData.password}"}`))
        .then(response => {
          console.log(response.data);
        }).catch(error => {
          console.log(error.response.data);
        });
    }
    
    return (
        <div class="container">
        <div class="row">
            <div class="col-sm-8 mt-3">

            <form class="mt-4"
                method="POST"
                enctype="multipart/form-data"
            >
                <div class="form-group">
                <input
                    type="file"
                    name="file"
                    id="input-files"
                    class="form-control-file border"
                />
                </div>
                <button type="submit" class="btn btn-primary" onSubmit={handleSubmit}>Submit</button>
            </form>
            </div>
        </div>
        <hr />
        <div class="row">
            <div class="col-sm-12">
            <div class="preview-images"></div>
            </div>
        </div>
        </div>
    );
}

export default SignIn;