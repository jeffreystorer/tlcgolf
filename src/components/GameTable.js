import React, {useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';
import '../styles/App.css';
import All from './All';
import Create from './Create';
import DropDowns from './DropDowns';
import SetGameTableDisplay from './SetGameTableDisplay';
import LinkButton from './LinkButton';
import {get} from '../functions/localStorage';
import requestGHIN from '../functions/requestGHIN';

function GameTable() {
  let displayNumber = SetGameTableDisplay();
  if (get('isLoggedIn') === undefined) {displayNumber = -1};
  let hasGoogleSheet = get('hasGoogleSheet');
  if (hasGoogleSheet === 'true') {requestGHIN()};
  
  useEffect(() => {
  let hasGoogleSheet = get('hasGoogleSheet');
  if (hasGoogleSheet === 'true') {    
    requestGHIN();
  }
  }, [])
  
  switch (displayNumber) {
  case 0:
      return(
        <>
        <Create />
        </>
      )
  case 1:
    return(
      <>
        <DropDowns />
        <br></br>
        <br></br>
        <br></br>
        <LinkButton title={'Edit Table'} />
      </>
    )
  case 2:
      return(
        <>
          <All />
        </>
      )
  case -1:
    return(
      <Route exact path="/games">
          <Redirect to="/settings/login"/>
      </Route>
    )
    default:
      return undefined;
  }
}

export default GameTable;