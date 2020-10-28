import React from 'react';
//import "bootstrap/dist/css/bootstrap.min.css";
import {
  RecoilRoot
} from 'recoil';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useParams,
  useRouteMatch
} from "react-router-dom";
import '../styles/App.css';
import Header from './Header';
import IndividualPage from './IndividualPage';
import GamesPage from './GamesPage';
import LoginPage from './LoginPage';
import SelectTeesPage from './SelectTeesPage';
import LineupPage from './LineupPage';
import HelpPage from './HelpPage';
import LineupsList from './LineupsList';

export default function App() {

  return (
    <RecoilRoot>
      <Router>
      <Header />
      <br/>
      <nav>
        <NavLink exact to="/" className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Individual</NavLink>
        <NavLink exact to="/games" className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Games</NavLink>
        <NavLink exact to="/lineup" className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Lineup</NavLink>
        <NavLink exact to="/settings" className='navitem-last' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Settings</NavLink>
      </nav>
      <Switch>
        <Route path="/games">
          <Games />
        </Route>
        <Route path="/lineup">
          <Lineup />
        </Route>
        <Route path="/settings" >
          <Settings />
        </Route>
        <Route path="/">
          <Individual />
        </Route>
      </Switch>
    </Router>
    </RecoilRoot>
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
    case 'help':
      return (
        <>
        <HelpPage />
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
      <NavLink exact to={`${url}/help`} className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Help</NavLink>
    </nav>
      <Switch>
        <Route path={`${path}/:settingId`}>
          <Setting />
        </Route>
      </Switch>
    </>
  );
}


function Lineup () {
  let {lineupId } = useParams();
  let aLineup= lineupId;
  switch (aLineup) {
    case "savedlineups":
      return (
        <>
        <LineupsList />
        </>
      )
    default:
      return (
        <>
          <LineupPage />
        </>
        )
  }

}

function Lineups () {
  let {path, url} = useRouteMatch();
  return (
    <>
      <br/>
    <nav >
      <NavLink exact to={`${url}/savedlineups`} className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Saved Lineups</NavLink>
    </nav>
      <Switch>
        <Route path={`${path}/:settingId`}>
          <Lineup />
        </Route>
      </Switch>
    </>
  );
}

  function  Games() {
  return (
    <>
      <br/><br/>
      <GamesPage />
    </>
  )
  }
    
  function  Individual() {
    return (
      <>
        <br/><br/>
        <IndividualPage />
      </>
    )
  }
