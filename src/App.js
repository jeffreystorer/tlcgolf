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
//import useDataAPI from './use-data-api.js';
import GameTable from './table-games';
//import {get} from './local-storage-functions';
import LoginPage from './login';
import SelectTees from './select-tees';
import SetupGames from './set-up-games';

function App() {
/*   const [{ data, isLoading, isError }, doFetch] = useDataAPI(
  "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" + get('ghinNumber') + "&lastName=" + get('LastName') + "&incllsudeLowHandicapIndex=true",
  {hits: []},
  ); */

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
      
    case "setupgames":
      return (
       <>
       <SetupGames />
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
  let {path, url} = useRouteMatch();
  return (
    <Fragment>
      <br/>
    <nav >
      <NavLink exact to={`${url}/login`} className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Login</NavLink>
      <NavLink exact to={`${url}/selecttees`} className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Select Tees</NavLink>
      <NavLink exact to={`${url}/setupgames`} className='navitem-last' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Setup Games</NavLink>
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
