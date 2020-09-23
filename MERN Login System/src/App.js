import React, { useState } from 'react';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp.js';
import Dash from './components/Dashboard/Dash.js';
import LandingPage from './components/Login/LandingPage.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import { ThemeContextProvider } from './components/contexts/ThemeContext';

const App = () => {
  // signedIn = state & setSignedIn = setState
  const [signedIn, setSignedIn] = useState([
    {
      signedIn: false
    }
  ]);

  const isLoggedIn = () => {
    if(signedIn) {
      console.log('Signed In');
    }
    else{
      console.log('Not Signed In');
    }
  }

  const lightTheme = { syntax: '#555', ui: '#ddd', bg: '#eee' }
  const darkTheme = { syntax: '#ddd', ui: '#333', bg: '#555' }

  return (
  <div className="App">
    <ThemeContextProvider value={lightTheme}>
      <Router>
        <Switch>
        <Route path='/' exact strict>
            <LandingPage></LandingPage>
          </Route>
          <Route path='/users/sign-in' exact strict>
            <SignIn></SignIn>
          </Route>
          <Route path='/users/sign-up' exact strict>
            <SignUp></SignUp>
          </Route>
          <Route path='/dashboard' exact strict>
            <Dash></Dash>
          </Route>
        </Switch>
      </Router>
    </ThemeContextProvider>
  </div>
  )
}

ReactDOM.render(
  <App />,
  document.querySelector('#root'),
);

// export default App;
// class App extends Component {


//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//         <Router>
//           <Switch>
//             {/* <Route path="/sign-in" exact strict component={SignIn}></Route> */}
//             <Route path="/login" exact strict component={Login}></Route>
//             <Route path="/" exact strict component={Login}></Route> {/*TODO: Send the user somewhere else if they're already logged in*/}
//           </Switch>
//         </Router>
//     );
//   }
// }

// export default App;