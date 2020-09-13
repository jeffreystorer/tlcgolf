import React from 'react';
import '../styles/App.css';
import GamesTableAll from './GamesTableAll';
import GamesTableCreate from './GamesTableCreate';
import GamesTableDropDowns from './GamesTableDropDowns';
import getGameTableDisplayNumber from '../functions/getGameTableDisplayNumber';
import LinkButton from './LinkButton';
import {get} from '../functions/localStorage';
import fetchGamesGHIN from '../functions/fetchGamesGHIN';
import {useRecoilState, useRecoilValue} from 'recoil';
import * as state from '../state';

export default function GamesTable() {
  const [games, setGames] = useRecoilState(state.gamesState)
  setGames(get('games'));
  const [players, setPlayers] = useRecoilState(state.playersState);
  setPlayers(get('players'));
  //eslint-disable-next-line
  const [teesSelected, setTeesSelected] = useRecoilState(state.teesSelectedState);
  setTeesSelected(get('teesSelected'));
  //eslint-disable-next-line
  const [ghinNumber, setGHINNumber] = useRecoilState(state.ghinNumberState);
  setGHINNumber(get('ghinNumber'));
  //eslint-disable-next-line
  const [sheetURL, setSheetURL] = useRecoilState(state.sheetURLState);
  setSheetURL(get('sheetURL'));
  const course = useRecoilValue(state.courseState);
  const game = useRecoilValue(state.gameState);
  const [hasGoogleSheet, setHasGoogleSheet] = useRecoilState(state.hasGoogleSheetState);
  setHasGoogleSheet(get('hasGoogleSheet'));

  let displayNumber = getGameTableDisplayNumber(course, game, games, hasGoogleSheet);
  if (hasGoogleSheet === 'true') {setPlayers(fetchGamesGHIN(players))};
  

  
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