import React from "react";
import { Link } from "react-router-dom";

function onSubmit() {
    console.log("Sign Up");
}

const Features = () => {
    return (
        <div className="App">
            <Link to="/" exact strict>Landing Page</Link>
            

        </div>
    )
}

export default Features;