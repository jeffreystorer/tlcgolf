import React, {useEffect} from 'react';
import '../styles/App.css';
import GamesTableAll from './GamesTableAll';
import GamesTableCreate from './GamesTableCreate';
import GamesTableDropDowns from './GamesTableDropDowns';
import getGameTableDisplayNumber from '../functions/getGameTableDisplayNumber';
import LinkButton from './LinkButton';
import fetchGamesGHIN from '../functions/fetchGamesGHIN';
import {get} from '../functions/localStorage'
import {useRecoilValue, useRecoilState} from 'recoil';
import * as state from '../state';

export default function GamesTable() {
  const [games, setGames] = useRecoilState(state.gamesState)
  //eslint-disable-next-line
  const [teesSelected, setTeesSelected] = useRecoilState(state.teesSelectedState);
  //eslint-disable-next-line
  const [ghinNumber, setGHINNumber] = useRecoilState(state.ghinNumberState);
  const course = useRecoilValue(state.courseState);
  const game = useRecoilValue(state.gameState);
  const hasGoogleSheet = get('hasGoogleSheet');

  useEffect(() => {
    setGHINNumber(get('ghinNumber'));
    setGames(get('games'));
    setTeesSelected(get('teesSelected'));
    
    return () => {
      //cleanup
    }
  //eslint-disable-next-line
  }, [])

  let displayNumber = getGameTableDisplayNumber(course, game, games, hasGoogleSheet);
  if (hasGoogleSheet === 'true') fetchGamesGHIN();
  

  
  switch (displayNumber) {
  case 0:
      return(
        <>
        <GamesTableCreate />
        </>
      )
  case 1:
    return(
      <>
        <GamesTableDropDowns />
        <br></br>
        <br></br>
        <br></br>
        <LinkButton title={'Edit Table'} />
      </>
    )
  case 2:
      return(
        <>
          <GamesTableAll />
        </>
      )
    default:
      return undefined;
  }
}