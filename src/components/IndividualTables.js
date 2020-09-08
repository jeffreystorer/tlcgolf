import React, {Fragment, useEffect} from 'react';
import '../styles/App.css';
import CHTableBody from './CHTableBody';
import TSTableBody from './TSTableBody';
import {get} from '../functions/localStorage';
import useDataAPI from '../functions/useDataAPI';
import RefreshGames from '../functions/refreshGames';
import LoginPage from './LoginPage';


function IndividualTables() {
  const ghinNumber = get('ghinNumber');
  const lastName = get('lastName');
  //eslint-disable-next-line
  const [{}, doFetch] = useDataAPI(
    "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=000000&lastName=None&incllsudeLowHandicapIndex=true",
    {hits: []},
  );
  
  
  useEffect(() => {    
    let hasGoogleSheet = get('hasGoogleSheet');
    if (hasGoogleSheet === 'true') {
      RefreshGames();
    }
  }, [])

  useEffect(() => {    
    let ghinRequest = "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" + ghinNumber + "&lastName=" + lastName + "&incllsudeLowHandicapIndex=true";
    doFetch(ghinRequest);
    
  }, [ghinNumber, lastName, doFetch]);
/*
We are only going to display this table if the golfer is logged in
and has selected at least one set of tees
*/
  let isLoggedIn = get('isLoggedIn')
  let teesSelected = get('teesSelected');
  if ((teesSelected !== null) & (teesSelected !== []) & isLoggedIn === 'true') {

  return (
    <Fragment>
      <div className='center golfer-center'>
          {get('golfer') + ' (Index: ' + get('index') + ')'}
      </div>      
      <br/>
      <div id='table'>
        <table id='chtable'>
          <thead>
            <tr>
              <th
                scope='col'
                className='left-header-cell'
              >
                CrsHcp
              </th>
              <th scope='col'>DC</th>
              <th scope='col'>MG</th>
              <th scope='col'>MW</th>
              <th scope='col'>OK</th>
              <th scope='col'>PA</th>
              <th scope='col'>TP</th>
            </tr>
          </thead>
          <tbody>
            <CHTableBody />
          </tbody>

        </table>
          <br/>
        <table id='tstable'>
          <thead>
            <tr>
              <th
                scope='col'
                className='left-header-cell'
              >
                Score
              </th>
              <th scope='col'>DC</th>
              <th scope='col'>MG</th>
              <th scope='col'>MW</th>
              <th scope='col'>OK</th>
              <th scope='col'>PA</th>
              <th scope='col'>TP</th>
            </tr>
          </thead>
          <tbody>
            <TSTableBody />
          </tbody>
        </table>
      </div>
    </Fragment>
  );
  } else {
    return(
      <>
          <LoginPage />
      </>
    )
  }
}

export default IndividualTables;