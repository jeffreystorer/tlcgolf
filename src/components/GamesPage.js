import React from 'react';
import {
  Route, Redirect
} from "react-router-dom";
import '../styles/App.css';
import GamesTable from './GamesTable';
import {get} from '../functions/localStorage';

export default function GamesPage() {
/*  We are only going to display the tables if the golfer is logged in  */
  const isLoggedIn = get('isLoggedIn');
  if (isLoggedIn === 'true') {

    return (
      <>
        <GamesTable />
      </>
    );
    } else {

    return(
      <Route exact path="/games">
          <Redirect to="/settings/login"/>
      </Route>
    )
  }
}

