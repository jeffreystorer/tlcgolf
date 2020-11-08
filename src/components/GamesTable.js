import React, {useEffect} from 'react';
import '../styles/App.css';
import GamesTableAll from './GamesTableAll';
import GamesAndLineupTableCreate from './GamesAndLineupTableCreate';
import GamesTableDropDowns from './GamesAndLineupTableDropDowns';
import getGameTableDisplayNumber from '../functions/getGamesAndLineupTableDisplayNumber';
import LinkButton from './LinkButton';
import IframesStorer from './IframesStorer';
import IframesCasey from './IframesCasey';
import fetchGamesGHIN from '../functions/fetchGamesGHIN';
import {get} from '../functions/localStorage';
import {useRecoilValue, useRecoilState} from 'recoil';
import * as state from '../state';
import useVisibilityChange from 'use-visibility-change';

export default function GamesTable({ratings, slopes, pars}) {
  const dataMode = get('dataMode');
  const [games, setGames] = useRecoilState(state.gamesState)
  //eslint-disable-next-line
  const [teesSelected, setTeesSelected] = useRecoilState(state.teesSelectedState);
  //eslint-disable-next-line
  const [ghinNumber, setGHINNumber] = useRecoilState(state.ghinNumberState);
  let isMe = false, isCasey = false;
  switch (ghinNumber) {
    case "585871":
      isMe = true;
      break;
    case "2898327":
      isCasey = true;
      break;
    case "2145248":
      isMe = true;
      break;
    case "8482980":
      isMe = true;
        break;
    case "8625458":
      isMe = true;
        break;
    default:
        break;
  }
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
  if (hasGoogleSheet === 'true') fetchGamesGHIN(dataMode);
  
  
  
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
        <br></br><br></br>
        <div className='center'>
        {isMe &&
        <IframesStorer />}
        {isCasey &&
        <IframesCasey />}
        </div>
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
        <br></br><br></br>
        <div className='center'>
        {isMe &&
        <IframesStorer />}
        {isCasey &&
        <IframesCasey />}
        </div>
      </>
    )
    default:
      return undefined;
  }
}