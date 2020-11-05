import React, { useState, useMemo, useReducer, createContext, useContext, useEffect } from 'react';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp.js';
import Dash from './components/Dashboard/Dash.js';
import LandingPage from './components/Login/LandingPage.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';




// const globalStateContext = React.createContext(defaultGlobalState);
// const dispatchStateContext = React.createContext(undefined);

// const GlobalStateProvider = ({ children }) => {
//   const [state, dispatch] = React.useReducer(
//     (state, newValue) => ({ ...state, ...newValue }),
//     defaultGlobalState
//   );
//   return (
//     <globalStateContext.Provider value={state}>
//       <dispatchStateContext.Provider value={dispatch}>
//         {children}
//       </dispatchStateContext.Provider>
//     </globalStateContext.Provider>
//   );
// };

// const useGlobalState = () => [
//   React.useContext(globalStateContext),
//   React.useContext(dispatchStateContext)
// ];



export const App = (props) => {
  
  const initialSession = {
    loggedIn: false, email: null, jwt: null
  };

  const [session, setSession] = useState(initialSession);
  
  const useComponentWillMount = (func) => {
    useMemo(func, [])
  }

  const transferLocalData = () => {
    if (localStorage.getItem('token') === null) {
      setSession({ jwt: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxMDkyMzcwOTEyMX0.Z6NTR6AhWXJlC9y5GI9pBc_fm3Wc6n7sZYlrdXEOKvY' }) 
    }
    else {
      setSession({ jwt: localStorage.getItem('token') }) 
    }
  }

  useComponentWillMount(transferLocalData);

  return (
    <div className="App">
        <Router>
          <Switch>
            <Route path='/' exact strict>
              <LandingPage></LandingPage>
            </Route>
            <Route path='/users/sign-in' exact strict>
              <SignIn appProps={{session}} setSession={setSession}></SignIn>
            </Route>
            <Route path='/users/sign-up' exact strict>
              <SignUp></SignUp>
            </Route>
            <ProtectedRoute
              path='/api/dashboard'
              exact strict
              setSession={setSession}
              appProps={{session}}
              component={Dash}>
            </ProtectedRoute>
          </Switch>
        </Router>
    </div>
  )
}



// // export default App;
// export default class App extends Component {

//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <Router>
//         <Switch>
//           <Route 
//             path='/' 
//             exact 
//             strict
//             render={(props) => 
//               <LandingPage/>
//             }
//           />
//           <Route path='/users/sign-in' exact strict>
//               <SignIn></SignIn>
//             </Route>
//             <Route path='/users/sign-up' exact strict>
//               <SignUp></SignUp>
//             </Route>
//             <Route path='/dashboard' exact strict>
//               <Dash></Dash>
//             </Route>
//         </Switch>
//       </Router>
//     );
//   }
// }
