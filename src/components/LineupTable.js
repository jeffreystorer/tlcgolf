import React, {useEffect} from 'react';
import '../styles/App.css';
import LineupTableAll from './LineupTableAll';
import GamesAndLineupTableCreate from './GamesAndLineupTableCreate';
import getGamesAndLineupTableDisplayNumber from '../functions/getGamesAndLineupTableDisplayNumber';
import {get, set} from '../functions/localStorage'
import {useRecoilValue, useRecoilState} from 'recoil';
import * as state from '../state';
import GamesAndLineupTableDropDowns from './GamesAndLineupTableDropDowns';

export default function LineupTable({ratings, slopes, pars}) { 
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
    return(
      <><p className='center-bold'>Click on the dropdown boxes below<br></br>to select a game and a course.</p>
        {set('savedTextAreaValue', '[Bets, Entry, Prize, Rules]')}
        <GamesAndLineupTableDropDowns />
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