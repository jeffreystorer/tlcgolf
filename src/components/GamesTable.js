import React, {useEffect} from 'react';
import '../styles/App.css';
import GamesTableAll from './GamesTableAll';
import GamesAndLineupTableCreate from './GamesAndLineupTableCreate';
import GamesTableDropDowns from './GamesAndLineupTableDropDowns';
import getGameTableDisplayNumber from '../functions/getGamesAndLineupTableDisplayNumber';
import LinkButton from './LinkButton';
import fetchGamesGHIN from '../functions/fetchGamesGHIN';
import {get} from '../functions/localStorage';
import {useRecoilValue, useRecoilState} from 'recoil';
import * as state from '../state';
import useVisibilityChange from 'use-visibility-change';

export default function GamesTable({ratings, slopes, pars}) {
  const [games, setGames] = useRecoilState(state.gamesState)
  //eslint-disable-next-line
  const [teesSelected, setTeesSelected] = useRecoilState(state.teesSelectedState);
  //eslint-disable-next-line
  const [ghinNumber, setGHINNumber] = useRecoilState(state.ghinNumberState);
  const course = useRecoilValue(state.courseState);
  const game = useRecoilValue(state.gameState);
  const hasGoogleSheet = get('hasGoogleSheet');
  const onShow = () => {
    window.location.reload();
  }
  useVisibilityChange({onShow});

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
        <GamesAndLineupTableCreate />
        </>
      )
  case 1:
    return(
      <><p className='center-bold'>Click on the dropdown boxes below<br></br>to select a game and a course.</p>
        <GamesTableDropDowns table="Games"/>
        <br></br>
        <br></br>
        <br></br>
        <LinkButton title={'Edit Table'} />
      </>
    )
  case 2:
      return(
        <>
          <GamesTableAll 
            ratings={ratings} 
            slopes={slopes} 
            pars={pars} 
            game={game} 
            course={course}
             />
        </>
      )
    default:
      return undefined;
  }
}