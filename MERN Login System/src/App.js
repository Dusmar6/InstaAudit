import React, { useState, useMemo, lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { makeStyles } from '@material-ui/core/styles';
import { AnimatePresence } from 'framer-motion';


const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const HowItWorks = lazy(() => import('./components/Info/HowItWorks'));
const TechnologiesUsed = lazy(() => import('./components/Info/TechnologiesUsed'));
const ForgotPassword = lazy(() => import('./components/Login/ForgotPassword'));
const SignIn = lazy(() => import('./components/Login/SignIn'));
const SignUp = lazy(() => import('./components/Login/SignUp'));
const Dash = lazy(() => import('./components/Dashboard/Dash'));
const LandingPage = lazy(() => import('./components/Login/LandingPage.js'));


const useStyles = makeStyles((theme) => ({
  App: {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    overflowY: 'hidden',
    overflowX: 'hidden'
  },

  // #global-container {
  //   opacity: 1;
  //   transition: 500ms;
  //   transform: translateX(0);
  //   transform-origin: left;
  //   }

  // html.is-animating #global-container {
  // 	opacity: 1;
  // 	transform: translateX(100%);
  // }


  /* Loading animation */
  // load: {
  //   position: 'relative',
  //   /* Firefox */
  //   left: '-moz-calc(50% - 50px)',
  //   top: '-moz-calc(50% - 50px)',
  //   /* WebKit */
  //   left: '-webkit-calc(50% - 50px)',
  //   top: '-webkit-calc(50% - 50px)',
  //   /* Opera */
  //   left: '-o-calc(50% - 50px)',
  //   top: '-o-calc(50% - 50px)',
  //   /* Standard */
  //   left: 'calc(50% - 50px)',
  //   top: 'calc(50% - 50px)',
  //   width: '100px',
  //   height: '100px',
  //   border: '5px solid black',
  //   backgroundColor: 'black',
  //   margin: '0',
  //   animation: 'transform(rotate(90)) 3s' 
  // }

  /* Scrollbar */
  '@global': {
    '*::-webkit-scrollbar-track': {
      border: '1px solid black',
      backgroundColor: '#F5F5F5'
    },

    '*::-webkit-scrollbar': {
      width: '8px',
      backgroundColor: '#F5F5F5'
    },

    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#000000'
    }
  }
}));

export const App = (props) => {

  const classes = useStyles();

  const initialSession = {
    jwt: null
  };

  const [session, setSession] = useState(initialSession);

  useMemo(() => {
    if (localStorage.getItem('token') === null) {
      setSession({ jwt: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxMDkyMzcwOTEyMX0.Z6NTR6AhWXJlC9y5GI9pBc_fm3Wc6n7sZYlrdXEOKvY' })
    }
    else {
      setSession({ jwt: localStorage.getItem('token') })
    }
  }, [])

  return (
    <div className="App" class={classes.App}>
      <BrowserRouter>
        <Suspense fallback={<div class={classes.load}></div>}>
          <AnimatePresence>
            <Switch>
              <Route path='/' exact strict>
                <LandingPage></LandingPage>
              </Route>
              <Route path='/how-it-works' exact strict>
                <HowItWorks></HowItWorks>
              </Route>
              <Route path='/about' exact strict>
                <HowItWorks></HowItWorks>
              </Route>
              <Route path='/support' exact strict>
                <h1>404: No support for you</h1>
              </Route>
              <Route path='/technologies-used' exact strict>
                <TechnologiesUsed></TechnologiesUsed>
              </Route>
              <Route path='/discover' exact strict>
                <TechnologiesUsed></TechnologiesUsed>
              </Route>
              <Route path='/forgot-password' exact strict>
                <ForgotPassword></ForgotPassword>
              </Route>
              <Route path='/users/sign-in' exact strict>
                <SignIn appProps={{ session }} setSession={setSession}></SignIn>
              </Route>
              <Route path='/users/sign-up' exact strict>
                <SignUp></SignUp>
              </Route>
              <ProtectedRoute
                path='/api/dashboard'
                exact strict
                setSession={setSession}
                appProps={{ session }}
                component={Dash}>
              </ProtectedRoute>
            </Switch>
          </AnimatePresence>
        </Suspense>
      </BrowserRouter>
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
