import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Header from './header.js';
import Login from './login.js';
import IndividualTables from './individual-tables.js';
import useDataAPI from './use-data-api.js';
/* import { Container, Row, Col } from 'reactstrap'
import ModalForm from './Components/Modals/Modal'
import DataTable from './Components/Tables/DataTable'
import { CSVLink } from "react-csv"; */
import CSV from './csv';
import TeeSelector from './tee-selector';
import ModeSelector from './mode-selector';
import GameTable from './game-table';
import DisplayUserGameTable from './display-user-game-table';


function App() {
  const [{ data, isLoading, isError }, doFetch] = useDataAPI(
  "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" + localStorage.getItem('lsGHINNumber') + "&lastName=" + localStorage.getItem('lsLastName') + "&incllsudeLowHandicapIndex=true",
  {hits: []},
);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/selecttees">Select Tees</Link>
            </li>
            <li>
              <Link to="/selectmode">Select Mode</Link>
            </li>
            <li>
              <Link to="/setupgames">Set up Games</Link>
            </li>
            <li>
              <Link to="/mygamesch">My Games CH</Link>
            </li>
            <li>
              <Link to="/myindividualch">My Individal CH </Link>
            </li>
          </ul>
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
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );


  function LoginPage() {
  return (
    <div>
    <Header />
    <br/>
    <br/>
    <Login />
    </div>
  )
  }

  function SelectTees() {
    return (
      <div>
      <Header />
      <br/>
      <br/>
      <TeeSelector />
      </div>
    )
  }
  

  function SelectMode() {
    return (
      <div>
      <Header />
      <br/>
      <br/>
      <ModeSelector />
      </div>
    )
  }

  function  SetUpGames() {
    return (
      <div>
        <Header />
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
    <Header />
    <br/>
    <GameTable />
    </div>
  );
  }
    
  function  MyIndividualCH() {
    return (
      <div>
      <Header />
      <br/>
      <br/>
      <IndividualTables />
      </div>
    )
  }
}

export default App;
