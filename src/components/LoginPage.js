import React, {useEffect, Fragment} from 'react';
import './App.css';
import { Button } from '@material-ui/core';
import {
  NavLink
  } from "react-router-dom";
import useDataAPI from '../functions/useDataAPI';
import { set } from '../functions/localStorage';
import {useStateWithLocalStorage} from '../use-state-with-local-storage';
import { SetHasGoogleSheet } from '../functions/setSheetURL';


function LoginPage() {
  const [ghinNumber, setGHINNumber] = useStateWithLocalStorage('ghinNumber');
  const [lastName, setLastName] = useStateWithLocalStorage('lastName');
  //eslint-disable-next-line
  const [{}, doFetch] = useDataAPI("",
    //"https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=0585871&lastName=Storer&incllsudeLowHandicapIndex=true",
    {hits: []},
  );

  useEffect(() => {
    localStorage.clear();
  },[]);
  
  useEffect(() => {
    set('ghinNumber', ghinNumber);
  }, [ghinNumber]);

  useEffect(() => {
    set('lastName', lastName);
  }, [lastName]);

  useEffect(() => {
    if ((ghinNumber !== "") & (lastName !== "")){
    let ghinRequest = "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" + ghinNumber + "&lastName=" + lastName + "&incllsudeLowHandicapIndex=true";
    doFetch(ghinRequest)
    }
  }, [ghinNumber, lastName, doFetch]);



  function handleLogin(e){
    SetHasGoogleSheet()
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
              onFocus={event => event.target.value = ghinNumber}
              onBlur={event => setGHINNumber(event.target.value)}
            />
          </div>

            <br></br><br></br>
          
          <div>
            <label htmlFor='lastName'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last Name:&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName"
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
              onClick={handleLogin}
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
