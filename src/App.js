import React, {Component} from 'react';
import './App.css';
import Header from './header.js';
import Login from './login.js';
import FGTable from './fgtable';
import Tables from './tables.js';
import useDataAPI from './use-data-api.js';
import NavbarChange from './navbar-change.js';
import NavbarLogin from './navbar-login.js';
/* import { Container, Row, Col } from 'reactstrap'
import ModalForm from './Components/Modals/Modal'
import DataTable from './Components/Tables/DataTable'
import { CSVLink } from "react-csv"; */
import CSV from './csv';

function App() {
/*   const [{ data, isLoading, isError }, doFetch] = useDataAPI(
  "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" + localStorage.getItem('lsGHINNumber') + "&lastName=" + localStorage.getItem('lsLastName') + "&incllsudeLowHandicapIndex=true",
  {hits: []},
); */


  if (localStorage.getItem('lsShowTables') === "true") {
    //refreshData();
    return (
      <div>
        <Header />
        <br/><br/>
        <Tables />
        <br/><br/>
        <NavbarChange />
      </div>
    )
  } else {
    return (
      <div>
        <Header />
        <br/>
        <br/>
        <Login />
        <br/>
        <br/>
        <NavbarLogin />
        <br/>
        <br/>
        <CSV />
        <br/>
        <br/>
        <FGTable />
        
      </div>
    )
  }
}

export default App;
