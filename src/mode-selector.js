import React from 'react';
import './App.css';import { Button } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function ModeSelector (){

    //if (localStorage.getItem('lsTeesSelected') !== null || localStorage.getItem("lsTeesSelected") !== '[]') {
      return (
        <div align='center'>
        <h5>
          To display the course handicaps<br/>
          for your games, you must first import<br/>
          a table of players and games:
        </h5>
        <br/>
        <Button
          variant="contained"
          color="primary">
          <Link 
            to="/setupgames"
            style={{color: "white"}}
          >
            Import Game Table
          </Link>
        </Button>
        <br/><br/><br/>
        <h5>
          Or your can display only your own<br/>
          course handicaps and target scores:
        </h5>
        <br/>
        <Button
          variant="contained"
          color="primary">
          <Link 
            to="/myindividualch"
            style={{color: "white"}}
          >
            Display My Course Handicaps
          </Link>
        </Button>
      </div>
   /*  ) } else {
      return null
    }; */
      );
  }

export default ModeSelector;