import React, { useEffect } from "react"
import "../Games.css"
import GamesTableAll from "../components/GamesTableAll"
import GamesTableCreate from "../../../shared/subcomponents/GamesTableCreate/components/GamesTableCreate"
import GamesTableDropDowns from "../components/GamesTableDropDowns"
import getGamesAndPlayersTableDisplayNumber from "../../../shared/helpers/getGamesAndPlayersTableDisplayNumber"
import LinkButton from "../../../shared/subcomponents/LinkButton/components/LinkButton"
import IframesStorer from "../components/IframesStorer"
import IframesCasey from "../components/IframesCasey"
import fetchGamesGHIN from "../../../shared/helpers/fetchGamesGHIN"
import { get } from "../../../shared/helpers/localStorage"
import { useRecoilState } from "recoil"
import * as state from "../../../shared/state"
import useVisibilityChange from "use-visibility-change"
import saveHandicapsToFirebase from "../helpers/saveHandicapsToFirebase"
import fetchCourseData from "../../../shared/helpers/fetchCourseData"

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
