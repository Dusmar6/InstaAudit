import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";

class Login extends Component  {
    
    constructor(props) {
        super(props);

        this.handleSignIn = this.handleSignIn.bind(this);
        // this.handleSignUp = this.handleSignUp.bind(this);

        this.state = {
            signIn: false,
            email: '',
            password: ''
        };
    }

    handleSignIn(e) {
        e.preventDefault();
        const data = new FormData(e.target);

        console.log("TODO: Update the url that axios uses /binary_baller/src/components/Login.js:41");
        let object = {};
        data.forEach((value, key) => {object[key] = value});
        JSON.stringify(object);
        axios.post("http://localhost:5000/api/users/sign-in", object);
    }

    render () {
        return (
            <div className="App">
                    <Link to="/" exact>Landing Page</Link>
                    
                    {/* Tab Links */}
                    <div className="tab">
                        <button className="btn">Sign In</button> 
                        <button className="btn">Sign Up</button>
                    </div>
                    


                    {/* Sign In Form */}
                    <div>
                        <form onSubmit={this.handleSignIn}>
                            <input className="emailInput" type="text" id="email" name="email" placeholder="Email"></input><br/><br/>
                            <input className="passwordInput" type="password" id="password" name="password" placeholder="Password"></input><br/><br/>
                            <button className="btn" style={{right:"40px"}}>Sign In</button>
                        </form>
                    </div>

                    <div>
                    </div>
            </div>
        );
    }
}

// function Tab() {
//     if (this.state.signIn) {
//         return <h1>Sign In</h1>
//     }
//     else {
//         <h1>Sign Up</h1>
//     }
// }

export default Login;