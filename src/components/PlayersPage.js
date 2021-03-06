import React, { useEffect } from "react"
import "../styles/App.css"
import { get } from "../helpers/localStorage"
import PlayersTableAll from "./PlayersTableAll"
import GamesTableCreate from "./GamesTableCreate"
import getGamesAndPlayersTableDisplayNumber from "../helpers/getGamesAndPlayersTableDisplayNumber"
import { useRecoilValue, useRecoilState } from "recoil"
import * as state from "../state"
import fetchCourseData from "../helpers/fetchCourseData"

export default function PlayersPage() {
  const [ratings, slopes, pars] = fetchCourseData()
  //eslint-disable-next-line
  const [games, setGames] = useRecoilState(state.gamesState)
  //eslint-disable-next-line
  const [teesSelected, setTeesSelected] = useRecoilState(
    state.teesSelectedState
  )
  //eslint-disable-next-line
  const [ghinNumber, setGHINNumber] = useRecoilState(state.ghinNumberState)
  const course = useRecoilValue(state.courseState)
  const game = useRecoilValue(state.gameState)
  //const hasGoogleSheet = get('hasGoogleSheet');

  useEffect(() => {
    setGHINNumber(get("ghinNumber"))
    setGames(get("games"))
    setTeesSelected(get("teesSelected"))

    //eslint-disable-next-line
  }, [])

  let displayNumber = getGamesAndPlayersTableDisplayNumber(
    course,
    game,
    games,
    "true"
  )

  switch (displayNumber) {
    case 0:
      return (
        <>
          <GamesTableCreate />
        </>
      )
    case 1:
      document.location = "/games"
      return <></>
    case 2:
      return (
        <>
          <PlayersTableAll ratings={ratings} slopes={slopes} pars={pars} />
        </>
      )
    default:
      return undefined
  }
}
