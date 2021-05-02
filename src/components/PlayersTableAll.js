import React, { useState } from "react"
import { get, set } from "../helpers/localStorage"
import "../styles/App.css"
import { v4 as uuidv4 } from "uuid"
import createPlayersArray from "../helpers/createPlayersArray"
import fetchMondaySchedules from "../helpers/fetchMondaySchedules"
import { useRecoilValue, useRecoilState } from "recoil"
import * as state from "../state"
//import * as c from '../helpers/consoleLogTable';

const PlayersTableAll = ({ ratings, slopes, pars }) => {
  const ghinNumber = get("ghinNumber")
  let isMe = false
  switch (ghinNumber) {
    case "585871":
      isMe = true
      break
    default:
      break
  }
  const [sortOrder, setSortOrder] = useState("alphabetical")
  //eslint-disable-next-line
  const [course, setCourse] = useRecoilState(state.courseState)
  //eslint-disable-next-line
  const [game, setGame] = useRecoilState(state.gameState)
  const games = useRecoilValue(state.gamesState)
  const teesSelected = useRecoilValue(state.teesSelectedState)
  const [showTips, setShowTips] = useState(get("showTips"))
  set("game", game)
 
  let playersArrayType = "createLineupTable"
  let notUsed = ""
  let playersArray = createPlayersArray(
    playersArrayType,
    notUsed,
    notUsed,
    course,
    game,
    games,
    teesSelected,
    ratings,
    slopes,
    pars,
    notUsed,
    notUsed,
    sortOrder
  )
  let playerCount = playersArray.length

  function handleSubmit(e) {
    e.preventDefault()
    var sel = document.getElementById("playerSelector")
    var alloptions = sel.options
    let options = []
    for (var i = 0, len = alloptions.length; i < len; i++) {
      if (alloptions[i].selected) {
        options = [...options, alloptions[i]]
      }
    }
    let playersInLineup = []
    Array.from(options).forEach(function (element) {
      playersInLineup = [...playersInLineup, element.value]
    })
    set("playersInLineup", playersInLineup)
    document.location = "/lineup"
  }

  function handleSortOrderChange(event) {
    setSortOrder(event.target.value)
    console.log(event.target.value)
    playersArray = createPlayersArray(
      playersArrayType,
      notUsed,
      notUsed,
      course,
      game,
      games,
      teesSelected,
      ratings,
      slopes,
      pars,
      notUsed,
      notUsed,
      event.target.value
    )
  }

  function handleShowTipsChange() {
    set("showTips", !showTips)
    setShowTips((prevState) => !prevState)
  }
  function handleFetchMondaySchedules(e) {
    e.preventDefault()
    fetchMondaySchedules()
    document.location = "/lineup"
  }

  let playersInLineupOptions = playersArray.map((player) => (
    <option key={uuidv4()} value={player.id}>
      {player.playerName}
    </option>
  ))

  return (
    <div className="div--center">
      {isMe && game === "Monday" && (
        <>
          <br />
          <form onSubmit={handleFetchMondaySchedules}>
            <input
              type="submit"
              className="button"
              value="Fetch Monday Players"
            />
          </form>
        </>
      )}
      <br></br>
      {showTips && (
        <div>
          <br></br>
          <table className="table">
            <thead>
              <tr>
                <th>To select players</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table-tip_td">
                  Please select the players in your lineup, then click "Next",
                  or, just click "Next" to accept the players already selected.
                  On a desktop or laptop computer, hold down the Ctrl (Windows)
                  or Command (Mac) button to select multiple players.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <h4>Select Players for Lineup</h4>
      <div className="select-dropdown-container">
        <label className="label_link-time">Sort Order: </label>
        <label className="selector_lone">
          <select value={sortOrder} onChange={handleSortOrderChange}>
            <option value="alphabetical">Alphabetical</option>
            <option value="byHandicap">By Handicap</option>
            <option value="random">Random</option>
          </select>
        </label>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          <select
            id="playerSelector"
            name="playersInLineup"
            multiple={true}
            size={playerCount}
          >
            {playersInLineupOptions}
          </select>
        </label>
        <br></br>
        <br></br>
        <input className="button" type="submit" value="Next" />
      </form>
      <br></br>
      <input
        className="checkbox"
        type="checkbox"
        onChange={handleShowTipsChange}
        defaultChecked={showTips}
      ></input>
      <label htmlFor="showTips">Show Tips</label>
    </div>
  )
}

export default PlayersTableAll
