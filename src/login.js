import React, {Fragment} from 'react';
import './App.css';
import { Button } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
  } from "react-router-dom";
import useDataAPI from './use-data-api';

function Login() {
  const [{ data, isLoading, isError }, doFetch] = useDataAPI(
    "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" + localStorage.getItem('lsGHINNumber') + "&lastName=" + localStorage.getItem('lsLastName') + "&incllsudeLowHandicapIndex=true",
    {hits: []},
  );
  let ghinRequest;

function handleLogin(e){
  //first we set the ghinRequest api
      ghinRequest = "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" + localStorage.getItem('lsGHINNumber') + "&lastName=" + localStorage.getItem('lsLastName') + "&incllsudeLowHandicapIndex=true";
  
  //then, we test if the user has selected at least one tee
      if ((localStorage.getItem('lsTeesSelected') === null) || (localStorage.getItem('lsTeesSelected') === '[]')){
  
  //if no tee has been selected, stay on login page and alert to select a tee
        /* localStorage.setItem('lsShowTables', 'false');
        alert("Please select at least one set of tees");
        window.location.reload(false); */
  
      } else {
  
  //otherwiese, if at leaste one tee has been selected, then we see if the user has tried to set a GHINumber or LastName
        if ((localStorage.getItem('lsGHINumber') !== null ) || (localStorage.getItem('lsLastName') !== null)) {
  
  //if the user has tried, we do a fetch and see if he entered good data
          doFetch(ghinRequest);
          if (localStorage.getItem('lsIsLoggedIn') === 'true') {
            localStorage.setItem('lsShowTables', 'true')
          }
          window.location.reload(false);
  
        } else { 
  
  //if the user hasn't tried, we ask him to enter the login credentials
              alert("Please enter your GHIN Number and Last Name");
              localStorage.setItem('lsShowTables', 'false')
              window.location.reload(false);
        }
      }
}

return (
    <Fragment>
      <div className='center' id='change-golfer'>
      <h5 width="95%">
        The first time you use this app on any device or<br/>
        to change golfers, you must login:
      </h5><br/>
        <div>
          <label htmlFor='ghinnumber'>GHIN Number:&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input 
            type="text" 
            id="ghinnumber" 
            name="ghinnumber"
            defaultValue='GHIN Number'
            onFocus={event => event.target.value = localStorage.getItem('lsGHINNumber')}
            onBlur={event => localStorage.setItem('lsGHINNumber', event.target.value)}
          />
        </div>

          <br></br><br></br>
        
        <div>
          <label htmlFor='lastname'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last Name:&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input 
            type="text" 
            id="lastname" 
            name="lastname"
            defaultValue='Last Name'
            onFocus={event => event.target.value = localStorage.getItem('lsLastName')}
            onBlur={event => localStorage.setItem('lsLastName', event.target.value)}
          />
        </div>
        <br/><br/>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}>
              <Link 
                to="/selecttees"
                style={{color: "white"}}
              >
                Login
              </Link>            
          </Button>
        </div>
      </div>
    </Fragment>
  );
}


export default Login;
