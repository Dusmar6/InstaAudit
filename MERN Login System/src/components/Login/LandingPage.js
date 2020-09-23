import React, { Component } from "react";
import { Link } from "react-router-dom";


class LandingPage extends Component  {

    render() {
        return (
            <div className="App">
                <div style={{position: "relative"}}>
                    <h1 type="center" style={{position: "center", fontSize: "20", color: "#bdc3c7"}}>Placeholder Text Click Anywhere to get Started</h1>
                </div>
                <div>
                    <Link to="/users/sign-in" strict exact>
                        <button style={{position: "absolute", left: "0px", top: "0px", width: "100vw", height: "100vh", background: "#fff", opacity: "0"}}></button>
                    </Link>
                </div> 
            </div>
        );
    }
}

export default LandingPage;