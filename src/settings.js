import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import './App.css';
import Header from './header.js';
import Login from './login.js';
import SelectTees from './select-tees';


function Settings () {

  return (
    <Router>
      <div>
        <Header />
        <br/>
      </div>
      <div>
        <nav>
          <NavLink exact to="/" className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Login</NavLink>
          <NavLink exact to="/selecttees" className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Select Tees</NavLink>
          <NavLink exact to="/setupgames" className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Set up Games</NavLink>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/selecttees">
            <SelectTees />
          </Route>
          <Route path="/setupgames">
            <SetUpGames />
          </Route>
          <Route path="/" >
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );


  function LoginPage() {
  return (
    <div>
    <br/>
    <br/>
    <Login />
    </div>
  )
  }

  function SelectTees() {
    return (
      <div>
        <br/>
        <br/>
        <SelectTees />
      </div>
    )
  }
  

  function  SetUpGames() {
    return (
      <div>
        <br/>
        <SetUpGames />
      </div>
    )
  }
}

export default Settings;
