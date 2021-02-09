import React, { useEffect } from "react"
import "../styles/App.css"
import LineupTableAll from "./LineupTableAll"
import getLineupTableDisplayNumber from "../helpers/getLineupTableDisplayNumber"
import { get } from "../helpers/localStorage"
import { useRecoilState } from "recoil"
import * as state from "../state"
//import * as c from '../helpers/consoleLogTable';

export default function LineupPage({ ratings, slopes, pars }) {
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
            Before you can display this page,<br></br>
            you must select a game and course<br></br>
            on the Games Page and then select<br></br>
            your players on the Players Page.
          </p>
        </>
      )
    case 1:
      return (
        <>
          <p className="center">
            Before you can display this page,<br></br>
            you must select your players<br></br>
            on the Players Page.
          </p>
        </>
      )
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
    case 3:
      return (
        <>
          <p className="center">
            Before you can display this page,<br></br>
            you must select a course<br></br>
            on the Games Page.
          </p>
        </>
      )
    default:
      return undefined
  }
}
