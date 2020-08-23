import React, {Fragment, useEffect} from 'react';
import './App.css';
import CHTableBody from './tables-individual-ch-body';
import TSTableBody from './tables-individual-ts-body';
import {get, jget} from './local-storage-functions';
import useDataAPI from './use-data-api';
import {useStateWithLocalStorage} from './use-state-with-local-storage';


function IndividualTables() {
  const [ghinNumber, setGHINNumber] = useStateWithLocalStorage('GHINNumber');
  const [lastName, setLastName] = useStateWithLocalStorage('LastName');
  const [{ data, isLoading, isError }, doFetch] = useDataAPI(
    "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" + get('GHINNumber') + "&lastName=" + get('LastName') + "&incllsudeLowHandicapIndex=true",
    {hits: []},
  );
  

  useEffect(() => {    
    let ghinRequest = "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" + ghinNumber + "&lastName=" + lastName + "&incllsudeLowHandicapIndex=true";
    doFetch(ghinRequest);
    
  }, [ghinNumber, lastName]);
/*
We are only going to display this table if the golfer is logged in
and has selected at least one set of tees
*/
  let isLoggedIn = get('IsLoggedIn')
  let teesSelected = jget('TeesSelected');
  if ((teesSelected !== null) & (teesSelected !== []) & isLoggedIn === 'true') {

  return (
    <Fragment>
      <div className='center golfer-center'>
          {get('Golfer') + ' (Index: ' + get('Index') + ')'}
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
      <div>
        <br/>
        <br/>
        <p className="center">
          Please go to Settings, then login and select at least one set of tees in order to display this table.
        </p>
      </div>
    )
  }
}

export default IndividualTables;