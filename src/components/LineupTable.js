import React, {useEffect} from 'react';
import '../styles/App.css';
import LineupTableAll from './LineupTableAll';
import GamesAndLineupTableCreate from './GamesAndLineupTableCreate';
import getLineupTableDisplayNumber from '../functions/getLineupTableDisplayNumber';
import {get} from '../functions/localStorage'
import {useRecoilState} from 'recoil';
import * as state from '../state';
//import * as c from '../functions/consoleLogTable';

export default function LineupTable({ratings, slopes, pars}) { 
  const [games, setGames] = useRecoilState(state.gamesState)
  //eslint-disable-next-line
  const [teesSelected, setTeesSelected] = useRecoilState(state.teesSelectedState);
  //eslint-disable-next-line
  const [ghinNumber, setGHINNumber] = useRecoilState(state.ghinNumberState);
  //eslint-disable-next-line
  const [course, setCourse] = useRecoilState(state.courseState);
  //eslint-disable-next-line
  const [game, setGame] = useRecoilState(state.gameState);
/*   console.log("LineupTable")
  c.l([course, game]);
  c.t([games, ratings, slopes, pars]); */

  useEffect(() => {
    setGHINNumber(get('ghinNumber'));
    setGames(get('games'));
    setTeesSelected(get('teesSelected'));
    setCourse(get('course'));
    setGame(get('game'));
    
    return () => {
      //cleanup
    }
  //eslint-disable-next-line
  }, [])

  let displayNumber = getLineupTableDisplayNumber(course, game, games, 'true');
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
          <LineupTableAll
          course={course}
          game={game}
          games={games}
          ratings={ratings}
          slopes={slopes}
          pars={pars} />
        </>
      )
    default:
      return undefined;
  }
}