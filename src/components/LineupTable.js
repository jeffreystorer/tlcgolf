import React, {useEffect} from 'react';
import '../styles/App.css';
import LineupTableAll from './LineupTableAll';
import GamesAndLineupTableCreate from './GamesAndLineupTableCreate';
import getGamesAndLineupTableDisplayNumber from '../functions/getGamesAndLineupTableDisplayNumber';
import fetchGamesGHIN from '../functions/fetchGamesGHIN';
import {get} from '../functions/localStorage'
import {useRecoilValue, useRecoilState} from 'recoil';
import * as state from '../state';

export default function LineupTable({ratings, slopes, pars}) { 
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

  let displayNumber = getGamesAndLineupTableDisplayNumber(course, game, games, hasGoogleSheet);
  if (hasGoogleSheet === 'true') fetchGamesGHIN();
  

  
  switch (displayNumber) {
  case 0:
      return(
        <>
        <GamesAndLineupTableCreate />
        </>
      )
  case 1:
    return(
      <><p className='center-bold'>Go to the Games page to select a game and a course.</p>
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