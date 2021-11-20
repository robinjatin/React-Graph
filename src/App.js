
import './App.css';

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Login from './Component/Login';
import Signup from './Component/Signup';
import ForgotPassword from './Component/ForgotPassword';
import Dashboard from './Component/Dashboard'
function App() {

  return (
   <>
   
   <Router> 
     <Switch>
       <Route exact path = "/">
        <Login/>
       </Route>
       <Route path = "/dashboard">
       <div className='App'>
         <div className='chart'>
         <Dashboard/>
         </div>
       </div>
      
       </Route>
       <Route path = "/signup">
        <Signup/>
       </Route>
       <Route path = "/forgot">
        <ForgotPassword/>
       </Route>
     </Switch>
   </Router>
   </> 
  );
}

export default App;
