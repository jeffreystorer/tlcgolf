import React from 'react';
import '../styles/App.css';
import All from './All';
import Create from './Create';
import DropDowns from './DropDowns';
import LoginPage from './LoginPage';
import SetGameTableDisplay from './SetGameTableDisplay';
import LinkButton from './LinkButton';
import refreshGames from '../functions/refreshGames';
import {get} from '../functions/localStorage';

function GameTable() {
  let displayNumber = SetGameTableDisplay();
  if (get('isLoggedIn') === undefined) {displayNumber = -1};
  
    let hasGoogleSheet = get('hasGoogleSheet');
    if (hasGoogleSheet === 'true') {
      refreshGames();
    }
  
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
    default:
      return(
        <>
          <LoginPage />
        </>
      )
  }

}

export default GameTable;