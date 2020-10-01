import React from "react";
import auth from "./auth";


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
