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
import IndividualTables from './individual-tables.js';
import useDataAPI from './use-data-api.js';
/* import { Container, Row, Col } from 'reactstrap'
import ModalForm from './Components/Modals/Modal'
import DataTable from './Components/Tables/DataTable'
import { CSVNavLink } from "react-csv"; */
import CSV from './csv';
import TeeSelector from './tee-selector';
import ModeSelector from './mode-selector';
import GameTable from './game-table';
import DisplayUserGameTable from './display-user-game-table';
import { get, set, jget, jset} from './local-storage-functions';


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
          <NavLink exact to="/" className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Login</NavLink>
          <NavLink exact to="/selecttees" className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Select Tees</NavLink>
          <NavLink exact to="/selectmode" className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Select Mode</NavLink>
          <NavLink exact to="/setupgames" className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>Set up Games</NavLink>
          <NavLink exact to="/mygamesch" className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>My Games CH</NavLink>
          <NavLink exact to="/myindividualch" className='navitem' activeStyle={{color:'#3378ac', fontWeight: 'bold'}}>My Individal CH </NavLink>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/selecttees">
            <SelectTees />
          </Route>
          <Route path="/selectmode">
            <SelectMode />
          </Route>
          <Route path="/setupgames">
            <SetUpGames />
          </Route>
          <Route path="/mygamesch">
            <MyGamesCH />
          </Route>
          <Route path="/myindividualch">
            <MyIndividualCH />
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
      <TeeSelector />
      </div>
    )
  }
  

  function SelectMode() {
    return (
      <div>
      <br/>
      <br/>
      <ModeSelector />
      </div>
    )
  }

  function  SetUpGames() {
    return (
      <div>
        <br/><br/>
        <CSV />
        {/* <br/><br/>
        <DisplayUserGameTable /> */}
      </div>
    )
    }
    
  function  MyGamesCH() {
  return (
    <div>
      <br/>    <br/>
      <GameTable />
    </div>
  );
  }
    
  function  MyIndividualCH() {
    return (
      <div>
      <br/>
      <br/>
      <IndividualTables />
      </div>
    )
  }
}

export default App;
