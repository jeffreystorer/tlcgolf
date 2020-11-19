import React, {useEffect} from 'react';
import '../styles/App.css';
import {get} from '../functions/localStorage';
import SelectPlayersTableAll from './SelectPlayersTableAll';
import GamesAndLineupTableCreate from './GamesAndLineupTableCreate';
import getGamesAndSelectPlayersTableDisplayNumber from '../functions/getGamesAndSelectPlayersTableDisplayNumber';
import {useRecoilValue, useRecoilState} from 'recoil';
import * as state from '../state';

export default function SelectPlayersTable({ratings, slopes, pars}) {
  //eslint-disable-next-line
  const [games, setGames] = useRecoilState(state.gamesState)
  //eslint-disable-next-line
  const [teesSelected, setTeesSelected] = useRecoilState(state.teesSelectedState);
  //eslint-disable-next-line
  const [ghinNumber, setGHINNumber] = useRecoilState(state.ghinNumberState);
  const course = useRecoilValue(state.courseState);
  const game = useRecoilValue(state.gameState);
  //const hasGoogleSheet = get('hasGoogleSheet');
 

  useEffect(() => {
    setGHINNumber(get('ghinNumber'));
    setGames(get('games'));
    setTeesSelected(get('teesSelected'));
    
    
  //eslint-disable-next-line
  }, [])

  let displayNumber = getGamesAndSelectPlayersTableDisplayNumber(course, game, games, 'true');
  //if (hasGoogleSheet === 'true') fetchGamesGHIN();
  

  
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
          <SelectPlayersTableAll ratings={ratings} slopes={slopes} pars={pars} />
        </>
      )
    default:
      return undefined;
  }
}