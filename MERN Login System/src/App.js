import React, { Component } from 'react';
import LandingPage from './components/LandingPage';
// import SignUp from './components/SignUp';
import './App.css';
import Login from './components/Login';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false
    };

  }

  render() {
    return (
      <Router>
        <Switch>
          {/* <Route path="/sign-in" exact strict component={SignIn}></Route> */}
          <Route path="/login" exact strict component={Login}></Route>
          <Route path="/" exact strict component={LandingPage}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;