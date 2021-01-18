import React, { useEffect } from "react"
import "../styles/App.css"
import LineupTableAll from "./LineupTableAll"
import getLineupTableDisplayNumber from "../functions/getLineupTableDisplayNumber"
import { get } from "../functions/localStorage"
import { useRecoilState } from "recoil"
import * as state from "../state"
//import * as c from '../functions/consoleLogTable';

export default function LineupTable({ ratings, slopes, pars }) {
  const [games, setGames] = useRecoilState(state.gamesState)
  //eslint-disable-next-line
  const [teesSelected, setTeesSelected] = useRecoilState(
    state.teesSelectedState
  )
  //eslint-disable-next-line
  const [ghinNumber, setGHINNumber] = useRecoilState(state.ghinNumberState)
  //eslint-disable-next-line
  const [course, setCourse] = useRecoilState(state.courseState)
  //eslint-disable-next-line
  const [game, setGame] = useRecoilState(state.gameState)

  useEffect(() => {
    setGHINNumber(get("ghinNumber"))
    setGames(get("games"))
    setTeesSelected(get("teesSelected"))
    setCourse(get("course"))
    setGame(get("game"))
    //eslint-disable-next-line
  }, [])

  let displayNumber = getLineupTableDisplayNumber(course, game, games, "true")

  switch (displayNumber) {
    case 0:
      return (
        <>
          <p className="center">
            Before you can display this table,<br></br>
            you must select a game and course<br></br>
            on the Games Page and then select<br></br>
            your players on the Players Page.
          </p>
        </>
      )
    case 1:
      document.location = "/"
      return <></>
    case 2:
      return (
        <>
          <LineupTableAll
            course={course}
            game={game}
            games={games}
            ratings={ratings}
            slopes={slopes}
            pars={pars}
          />
        </>
      )
    default:
      return undefined
  }
}
