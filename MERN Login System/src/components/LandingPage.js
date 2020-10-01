import React, { Component } from "react";
import { Link } from "react-router-dom";


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
