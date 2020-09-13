import React from 'react';
import {
  Route, Redirect
} from "react-router-dom";
import '../styles/App.css';
import GamesTable from './GamesTable';
import {get} from '../functions/localStorage';

export default function GamesPage() {
/*  We are only going to display this table if the golfer is logged in
  and has selected at least one set of tees
  */
    const isLoggedIn = get('isLoggedIn');
    if (isLoggedIn === 'true') {

  return (
    <>
      <GamesTable />
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
