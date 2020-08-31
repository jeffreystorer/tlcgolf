import React, {useEffect, Fragment} from 'react';
import './App.css';
import { Button } from '@material-ui/core';
import {
  //BrowserRouter as Router,
  //Switch,
  //Route,
  NavLink
  } from "react-router-dom";
import useDataAPI from './use-data-api';
import { set, get} from './local-storage-functions';
import {useStateWithLocalStorage} from './use-state-with-local-storage';


function LoginPage() {
  const [ghinNumber, setghinNumber] = useStateWithLocalStorage('ghinNumber');
  const [lastName, setLastName] = useStateWithLocalStorage('lastName');
  const [{ data, isLoading, isError }, doFetch] = useDataAPI(
    "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" + ghinNumber + "&lastName=" + lastName + "&incllsudeLowHandicapIndex=true",
    {hits: []},
  );
  
  useEffect(() => {
    set('ghinNumber', ghinNumber);
  }, [ghinNumber]);

  useEffect(() => {
    set('lastName', lastName);
  }, [lastName]);

  useEffect(() => {    
    let ghinRequest = "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" + ghinNumber + "&lastName=" + lastName + "&incllsudeLowHandicapIndex=true";
    doFetch(ghinRequest)
  }, [ghinNumber, lastName]);



 /*  function handleLogin(e){
    //first we set the ghinRequest api
    ghinRequest = "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" + ghinNumber + "&lastName=" + lastName + "&incllsudeLowHandicapIndex=true";

//TODO: fetch data from firebase

    } */


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
              onFocus={event => event.target.value = ghinNumber}
              onBlur={event => setghinNumber(event.target.value)}
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
              onFocus={event => event.target.value = lastName}
              onBlur={event => setLastName(event.target.value)}
            />
          </div>
          <br/><br/>
          <div>
            <Button
              variant="contained"
              color="primary"
              >
                <NavLink exact
                  to="/settings/selecttees"
                  style={{color: "white"}}
                >
                  Login
                </NavLink> 
            </Button>
          </div>
        </div>
      </Fragment>
  );
}


export default LoginPage;
