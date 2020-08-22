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
  const [ghinNumber, setGHINNumber] = useStateWithLocalStorage('GHINNumber');
  const [lastName, setLastName] = useStateWithLocalStorage('LastName');
  const [{ data, isLoading, isError }, doFetch] = useDataAPI(
    "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" + get('GHINNumber') + "&lastName=" + get('LastName') + "&incllsudeLowHandicapIndex=true",
    {hits: []},
  );
  
  useEffect(() => {
    set('GHINNumber', ghinNumber);
  }, [ghinNumber]);

  useEffect(() => {
    set('LastName', lastName);
  }, [lastName]);

  useEffect(() => {    
    let ghinRequest = "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" + ghinNumber + "&lastName=" + lastName + "&incllsudeLowHandicapIndex=true";
    doFetch(ghinRequest)
  }, [ghinNumber, lastName]);



 /*  function handleLogin(e){
    //first we set the ghinRequest api
    ghinRequest = "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" + ghinNumber + "&lastName=" + lastName + "&incllsudeLowHandicapIndex=true";

//now we see if the user has tried to set a GHINNumber or LastName
      //if ((get('GHINNumber') !== null ) & (get('LastName') !== null)) {
      if ((ghinNumber !== '') & (lastName !== '')) {
//the user has tried to set a GHINNumber and Last Name, we do a fetch and see if he entered good data
        alert('Fetching GHINData');
        doFetch(ghinRequest);
        window.location.reload(false);

      } else { 

//if the user hasn't tried, we ask him to enter the login credentials
        alert("Please enter your GHIN Number and Last Name");
        //window.location.reload(false);
      }

//TODO: fetch data from firebase

    }
 */

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
              onBlur={event => setGHINNumber(event.target.value)}
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
