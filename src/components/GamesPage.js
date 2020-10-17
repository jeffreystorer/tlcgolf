import React from 'react';
import {
  Route, Redirect
} from "react-router-dom";
import '../styles/App.css';
import GamesTable from './GamesTable';
import {get} from '../functions/localStorage';
import fetchCourseData from '../functions/fetchCourseData';


export default function GamesPage() {  
  const [ratings, slopes, pars] = fetchCourseData();

/*  We are only going to display the tables if the golfer is logged in  */
  const isLoggedIn = get('isLoggedIn');
  if (isLoggedIn === 'true') {

    return (
      <>
        <GamesTable ratings={ratings} slopes={slopes} pars={pars}/>
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

