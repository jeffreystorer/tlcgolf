import React from "react"
import { get, set } from "../helpers/localStorage"
import "../styles/App.css"
import { v4 as uuidv4 } from "uuid"
import createLineupTablePlayersArray from "../helpers/createLineupTablePlayersArray"
import { useRecoilValue } from "recoil"
import * as state from "../state"

export default function AddPlayersToSavedLineup({
  course,
  game,
  ratings,
  slopes,
  pars,
  handleAddPlayersClick,
}) {
  const games = useRecoilValue(state.gamesState)
  const teesSelected = useRecoilValue(state.teesSelectedState)
  set("game", game)
  let randomTeams = false
  /*   console.log("SelectPlayersTableAll")
  c.l([course,game, showTips]);
  c.t([games, teesSelected]) */

  let playersArray = createLineupTablePlayersArray(
    course,
    game,
    games,
    teesSelected,
    ratings,
    slopes,
    pars,
    randomTeams
  )

  let playersInLineup = get("playersInLineup")

  function handleSubmit(e) {
    e.preventDefault()
    var sel = document.getElementById("addPlayerSelector")
    var alloptions = sel.options
    let options = []
    for (var i = 0, len = alloptions.length; i < len; i++) {
      if (alloptions[i].selected) {
        options = [...options, alloptions[i]]
      }
    }
    Array.from(options).forEach(function (element) {
      playersInLineup = [...playersInLineup, element.value]
    })
    set("playersInLineup", playersInLineup)
    handleAddPlayersClick()
  }

  let playersNotInLineupArray = []
  console.table(playersInLineup)

  playersArray.forEach((player) => {
    console.log(playersInLineup.includes(player.id.toString()))
    if (playersInLineup.includes(player.id.toString()) === false) {
      playersNotInLineupArray.push(player)
    }
  })

  let playersInLineupOptions = playersNotInLineupArray.map((player) => (
    <option key={uuidv4()} value={player.id}>
      {player.playerName}
    </option>
  ))

  return (
    <>
      <div align="center">
        <br></br>
        <form onSubmit={handleSubmit}>
          <label>
            <select
              id="addPlayerSelector"
              name="playersInLineup"
              multiple={true}
              size={20}
            >
              {playersInLineupOptions}
            </select>
          </label>
          <br></br>
          <br></br>
          <input
            id="add-players-to-Saved-Lineup"
            type="submit"
            value="Add Players"
          />
        </form>
      </div>
    </>
  )
}
