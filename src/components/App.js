import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useParams,
  useRouteMatch
} from "react-router-dom";
import './styles/App.css';
import Header from '../Header';
import IndividualTables from '../IndividualTables';
import GameTable from '../GameTable';
import LoginPage from '../LoginPage';
import SelectTeesPage from '../SelectTeesPage';
import SettingsPage from '../SettingsPage'

function App() {

  return (
    <Router>
      <Header />
      <br/>
      <nav>
        <NavLink exact to="/" className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Individual</NavLink>
        <NavLink exact to="/games" className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Games</NavLink>
        <NavLink exact to="/settings" className='navitem-last' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Settings</NavLink>
      </nav>
      <Switch>
        <Route path="/games">
          <Games />
        </Route>
        <Route path="/settings" >
          <Settings />
        </Route>
        <Route path="/">
          <Individual />
        </Route>
      </Switch>
    </Router>
  );


  }
  

function Setting () {
  let {settingId } = useParams();
  let aSetting = settingId;
  switch (aSetting) {
    case "selecttees":
      return (
        <>
        <SelectTeesPage />
        </>
      )
  
    default:
      return (
        <>
          <LoginPage />
        </>
        )
  }

}

function Settings () {
  let {path, url} = useRouteMatch();
  return (
    <>
      <br/>
    <nav >
      <NavLink exact to={`${url}/login`} className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Login</NavLink>
      <NavLink exact to={`${url}/selecttees`} className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Select Tees</NavLink>
    </nav>
      <Switch>
        <Route path={`${path}/:settingId`}>
          <SettingsPage />
        </Route>
      </Switch>
    </>
  );
}

  function  Games() {
  return (
    <>
      <br/><br/>
      <GameTable />
    </>
  )
  }
    
  function  Individual() {
    return (
      <>
        <br/><br/>
        <IndividualTables />
      </>
    )
  }

  function Login() {
    return(
      <Fragment>
        <LoginPage />
      </Fragment>
    )
  }

export default App;
