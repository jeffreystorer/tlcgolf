import React, { useEffect } from "react"
import "../styles/App.css"
import GamesTableAll from "./GamesTableAll"
import GamesTableCreate from "./GamesTableCreate"
import GamesTableDropDowns from "./GamesTableDropDowns"
import getGamesAndPlayersTableDisplayNumber from "../Shared/functions/getGamesAndPlayersTableDisplayNumber"
import LinkButton from "./LinkButton"
import IframesStorer from "./IframesStorer"
import IframesCasey from "./IframesCasey"
import fetchGamesGHIN from "../../functions/fetchGamesGHIN"
import { get } from "../../functions/localStorage"
import { useRecoilState } from "recoil"
import * as state from "../../state"
import useVisibilityChange from "use-visibility-change"
import saveHandicapsToFirebase from "../../functions/saveHandicapsToFirebase"
import fetchCourseData from "../Shared/functions/fetchCourseData"

export default function GamesPage() {
  const [ratings, slopes, pars] = fetchCourseData()
  const players = get("players")
  const dataMode = get("dataMode")
  const [games, setGames] = useRecoilState(state.gamesState)
  //eslint-disable-next-line
  const [teesSelected, setTeesSelected] = useRecoilState(
    state.teesSelectedState
  )
  //eslint-disable-next-line
  const [ghinNumber, setGHINNumber] = useRecoilState(state.ghinNumberState)
  let isMe = false,
    isCasey = false
  switch (ghinNumber) {
    case "585871":
      isMe = true
      break
    case "2898327":
      isCasey = true
      break
    case "2145248":
      isMe = true
      break
    case "8482980":
      isMe = true
      break
    case "8625458":
      isMe = true
      break
    default:
      break
  }
  const [course, setCourse] = useRecoilState(state.courseState)
  const [game, setGame] = useRecoilState(state.gameState)
  let savedCourse = get("course")
  let savedGame = get("game")
  const hasGoogleSheet = get("hasGoogleSheet")
  const onShow = () => {
    window.location.reload()
  }
  useVisibilityChange({ onShow })

  useEffect(() => {
    setCourse(savedCourse)
    setGame(savedGame)
    setGHINNumber(get("ghinNumber"))
    setGames(get("games"))
    setTeesSelected(get("teesSelected"))
    //eslint-disable-next-line
  }, [])

  let displayNumber = getGamesAndPlayersTableDisplayNumber(
    course,
    game,
    games,
    hasGoogleSheet
  )
  if (hasGoogleSheet === "true") fetchGamesGHIN(dataMode)

  function handlePublishHandicapsClick() {
    let firebaseRef = "handicaps"
    saveHandicapsToFirebase(
      players,
      game,
      course,
      games,
      teesSelected,
      ratings,
      slopes,
      pars,
      firebaseRef
    )
    document.location = "https://tlcgolfhandicaps.web.app"
  }

  switch (displayNumber) {
    case 0:
      return (
        <>
          <GamesTableCreate />
        </>
      )
    case 1:
      return (
        <>
          <p className="center-bold">
            Click on the dropdown boxes below<br></br>to select a game and a
            course.
          </p>
          <GamesTableDropDowns />
          <br></br>
          <br></br>
          <br></br>
          <LinkButton title={"Edit Table"} />
          <br></br>
          <br></br>
          <div className="center">
            {isMe && <IframesStorer />}
            {isCasey && <IframesCasey />}
          </div>
        </>
      )
    case 2:
      return (
        <>
          <GamesTableAll
            ratings={ratings}
            slopes={slopes}
            pars={pars}
            game={game}
            course={course}
          />
          <br></br>
          {isMe && (
            <div className="center">
              <br></br>
              <button className="center" onClick={handlePublishHandicapsClick}>
                Publish Handicaps
              </button>
            </div>
          )}
          <br></br>
          <br></br>
          <div className="center">
            {isMe && <IframesStorer />}
            {isCasey && <IframesCasey />}
          </div>
        </>
      )
    default:
      return undefined
  }
}
