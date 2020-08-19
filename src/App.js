import React from 'react';
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
import useDataAPI from './use-data-api.js';
import GameTable from './table-games';
import {get} from './local-storage-functions';
import LoginPage from './login';
import SelectTees from './select-tees';
import SetupGames from './set-up-games';

function App() {
  const [{ data, isLoading, isError }, doFetch] = useDataAPI(
  "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" + get('GHINNumber') + "&lastName=" + get('LastName') + "&incllsudeLowHandicapIndex=true",
  {hits: []},
  );

  return (
    <Router>
      <div>
        <Header />
        <br/>
      </div>
      <div>
        <nav>
          <NavLink exact to="/individual" className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Individual</NavLink>
          <NavLink exact to="/games" className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Games</NavLink>
          <NavLink exact to="/settings" className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Settings</NavLink>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/individual">
            <Individual />
          </Route>
          <Route path="/games">
            <Games />
          </Route>
          <Route path="/settings" >
            <Settings />
          </Route>
        </Switch>
      </div>
    </Router>
  );


  }
  

function Setting () {
  let {settingId } = useParams();
  let aSetting = settingId;
  switch (aSetting) {
    case "selecttees":
      return (
      <div>
        <SelectTees />
      </div>
      )
      
    case "setupgames":
      return (
      <div>
        <SetupGames />
      </div>
      )
  
    default:
      return (
        <div>
          <Login />
        </div>
        )
  }

}

function Settings () {
  let {path, url} = useRouteMatch();
  return (
    <div>
    <nav>
      <NavLink exact to={`${url}/login`} className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Login</NavLink>
      <NavLink exact to={`${url}/selecttees`} className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Select Tees</NavLink>
      <NavLink exact to={`${url}/setupgames`} className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Setup Games</NavLink>
    </nav>
    <Switch>
        <Route path={`${path}/:settingId`}>
          <Setting />
        </Route>
      </Switch>
    </div>
  );
}

  function  Games() {
  return (
    <div>
      <br/>    <br/>
      <GameTable />
    </div>
  );
  }
    
  function  Individual() {
    return (
      <div>
      <br/>
      <br/>
      <IndividualTables />
      </div>
    )
  }

  function Login() {
    return(
      <div>
        <LoginPage />
      </div>
    )
  }

export default App;
