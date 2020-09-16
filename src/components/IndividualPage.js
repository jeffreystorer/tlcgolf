import React from 'react';
import {
  Route, Redirect
} from "react-router-dom";
import '../styles/App.css';
import IndividualTables from './IndividualTables';
import {get} from '../functions/localStorage';

function IndividualPage() {
/*  We are only going to display the tabls if the golfer is logged in  */
  const isLoggedIn = get('isLoggedIn');
  if (isLoggedIn === 'true') {

    return (
      <>
        <IndividualTables />
      </>
    );
    } else {
      
    return(
      <Route exact path="/">
          <Redirect to="/settings/login"/>
      </Route>
    )
  }
}

export default IndividualPage;