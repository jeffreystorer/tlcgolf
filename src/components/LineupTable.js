import React from 'react';
import '../styles/App.css';
import LineupTableAll from './LineupTableAll';
import GamesAndLineupTableCreate from './GamesAndLineupTableCreate';
import getLineupTableDisplayNumber from '../functions/getLineupTableDisplayNumber';import {useRecoilValue, useRecoilState} from 'recoil';
import * as state from '../state';
import {get} from '../functions/localStorage';


export default function LineupTable({ratings, slopes, pars}) {
//const players = get('players');
  //eslint-disable-next-line
const [games, setGames] = useRecoilState(state.gamesState)
//eslint-disable-next-line
const [teesSelected, setTeesSelected] = useRecoilState(state.teesSelectedState);
//eslint-disable-next-line
const [ghinNumber, setGHINNumber] = useRecoilState(state.ghinNumberState);
const course = useRecoilValue(state.courseState);
const game = useRecoilValue(state.gameState);
let hasGoogleSheet = get('hasGoogleSheet');
let displayNumber = getLineupTableDisplayNumber(course, game, games, hasGoogleSheet);
  
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