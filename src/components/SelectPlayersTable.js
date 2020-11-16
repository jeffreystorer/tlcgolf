import React, {useEffect} from 'react';
import '../styles/App.css';
import SelectPlayersTableAll from './SelectPlayersTableAll';
import GamesAndLineupTableCreate from './GamesAndLineupTableCreate';
import getGamesAndLineupTableDisplayNumber from '../functions/getGamesAndLineupTableDisplayNumber';
import {get} from '../functions/localStorage'
import {useRecoilValue, useRecoilState} from 'recoil';
import * as state from '../state';

export default function SelectPlayersTable({ratings, slopes, pars}) { 
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
    
    return () => {
      //cleanup
    }
  //eslint-disable-next-line
  }, [])

  let displayNumber = getGamesAndLineupTableDisplayNumber(course, game, games, 'true');
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