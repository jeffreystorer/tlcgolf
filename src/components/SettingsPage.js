import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import '../styles/App.css';
import Header from './Header';
import LoginPage from './LoginPage';
import SelectTeesPage from './SelectTeesPage';


function SettingsPage () {

  return (
    <Router>
      <div>
        <Header />
        <br/>
      </div>
      <div>
        <nav>
          <NavLink exact to="/" className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Login</NavLink>
          <NavLink exact to="/selecttees" className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Select Tees</NavLink>        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/selecttees">
            <SelectTees />
          </Route>
          <Route path="/" >
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );


  function Login() {
  return (
    <div>
    <br/>
    <br/>
    <LoginPage />
    </div>
  )
  }

  function SelectTees() {
    return (
      <div>
        <br/>
        <br/>
        <SelectTeesPage />
      </div>
    )
  }
}

export default SettingsPage;