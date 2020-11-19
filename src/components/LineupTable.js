import React from 'react';
import '../styles/App.css';
import LineupTableAll from './LineupTableAll';
import GamesAndLineupTableCreate from './GamesAndLineupTableCreate';
import getLineupTableDisplayNumber from '../functions/getLineupTableDisplayNumber';
import {get} from '../functions/localStorage';


export default function LineupTable({ratings, slopes, pars}) {
  let course = get('course');
  let game = get('game');
  let games = get('games');
  let hasGoogleSheet = get('hasGoogleSheet');
  let displayNumber = getLineupTableDisplayNumber(course, game, games, hasGoogleSheet);
  console.log(course, game, games, hasGoogleSheet, displayNumber)
    
  switch (displayNumber) {
  case 0:
      return(
        <>
        <GamesAndLineupTableCreate />
        </>
      )
  case 1:
    document.location = '/games'
    return(
      <>
      </>
    )
  case 2:
      return(
        <>
          <LineupTableAll ratings={ratings} slopes={slopes} pars={pars} />
        </>
      )
    default:
      return undefined;
  }
}