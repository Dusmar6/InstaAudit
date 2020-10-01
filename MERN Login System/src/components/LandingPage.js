<<<<<<< HEAD
import React from "react";
import auth from "./auth";
=======
import React, { Component } from "react";
import { Link } from "react-router-dom";
>>>>>>> 43b33ebf38194ede5782b0f215f54cdf1129b5d1


const LandingPage = props =>  {

    return (
        <div>
            <h1>Landing Page</h1>
            <button 
                onClick={() => {
                    auth.login(() => {
                        props.history.push("/users/sign-in")
                    });
                }}
            >
             Login
            </button>
        </div>
    );
};

export default LandingPage;
