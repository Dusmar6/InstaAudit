import React, { Component } from "react";
import { Link } from "react-router-dom";


class LandingPage extends Component  {

    onSubmit() {
        console.log("Working");
    }

    render() {
        return (
            <div className="App">
                <video autoPlay loop muted
                style={{
                    position: "absolute",
                    width: "100%",
                    left: "50%",
                    top: "50%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "translate(-50%, -50%)",
                    zIndex: "-1",
                    opacity: "0.6"
                }}>
                    <source src={LandingVid} type="video/mp4"/>
                </video>
                <div style={{position: "relative"}}>
                    <h1 type="center" style={{position: "center", fontSize: "20", color: "#bdc3c7"}}>Placeholder Text Click Anywhere to get Started</h1>
                    {/* <text type="center" style={{fontSize: "11", color: "#85D5D6", outline: "22px", outlineColor: "#fff"}}>Get Started</text> */}
                </div>
                <div>
                    <Link to="/login" strict exact>
                        <button onClick={this.onSubmit}style={{position: "absolute", left: "0px", top: "0px", width: "100vw", height: "100vh", background: "#fff", opacity: "0"}}></button>
                    </Link>
                </div> 
            </div>
        );
    }
}

export default LandingPage;