import React, {Fragment} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useParams,
  useRouteMatch
} from "react-router-dom";
import './App.css';
import Header from './header.js';
import IndividualTables from './tables-individual.js';
import GameTable from './table-games';
import LoginPage from './login';
import SelectTees from './select-tees';
import EditGames from './edit-games';
import {get} from './local-storage-functions';

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
        <SelectTees />
        </>
      )
      
    case "editgames":
      return (
       <>
       <EditGames />
       </>
      )
  
    default:
      return (
        <>
          <Login />
        </>
        )
  }

}

function Settings () {
  const hasGoogleSheet = get('hasGoogleSheet');
  function gameTabLabel(){
  if (hasGoogleSheet === 'true') {
    return "Edit Games"
  } else {
    return "Setup Games"
  }}
  console.log(gameTabLabel());
  let {path, url} = useRouteMatch();
  return (
    <Fragment>
      <br/>
    <nav >
      <NavLink exact to={`${url}/login`} className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Login</NavLink>
      <NavLink exact to={`${url}/selecttees`} className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Select Tees</NavLink>
      <NavLink exact to={`${url}/editgames`} className='navitem-last' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>{gameTabLabel()}</NavLink>
    </nav>
      <Switch>
        <Route path={`${path}/:settingId`}>
          <Setting />
        </Route>
      </Switch>
    </Fragment>
  );
}

  function  Games() {
  return (
    <Fragment>
      <br/><br/>
      <GameTable />
    </Fragment>
  )
  }
    
  function  Individual() {
    return (
      <Fragment>
        <br/><br/>
        <IndividualTables />
      </Fragment>
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
