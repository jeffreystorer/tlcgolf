import React from "react"
import { get, set } from "../helpers/localStorage"
import "../styles/App.css"
import { v4 as uuidv4 } from "uuid"
import createLineupTablePlayersArray from "../helpers/createLineupTablePlayersArray"
import { useRecoilValue } from "recoil"
import * as state from "../state"

export default function DeletePlayersFromSavedLineup({
  course,
  game,
  ratings,
  slopes,
  pars,
  handleDeletePlayersClick,
}) {
  const games = useRecoilValue(state.gamesState)
  const teesSelected = useRecoilValue(state.teesSelectedState)
  set("game", game)
  let randomTeams = false

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
    var sel = document.getElementById("DeletePlayerSelector")
    var alloptions = sel.options
    let options = []
    for (var i = 0, len = alloptions.length; i < len; i++) {
      if (alloptions[i].selected) {
        options = [...options, alloptions[i]]
      }
    }
    let playersToBeDeleted = []
    options.forEach((option) => {
      playersToBeDeleted.push(option.value)
    })
    let newPlayersInLineup = []
    playersInLineup.forEach((player) => {
      if (playersToBeDeleted.includes(player) === false) {
        newPlayersInLineup.push(player)
      }
    })
    set("playersInLineup", newPlayersInLineup)
    handleDeletePlayersClick()
  }

  let playersInLineupArray = []

  playersArray.forEach((player) => {
    if (playersInLineup.includes(player.id.toString()) === true) {
      playersInLineupArray.push(player)
    }
  })

  let playersInLineupOptions = playersInLineupArray.map((player) => (
    <option key={uuidv4()} value={player.id}>
      {player.playerName}
    </option>
  ))

  return (
    <>
      <div className="div--center">
        <br></br>
        <form onSubmit={handleSubmit}>
          <label>
            <select
              id="DeletePlayerSelector"
              name="playersInLineupDelete"
              multiple={true}
              size={20}
            >
              {playersInLineupOptions}
            </select>
          </label>
          <br></br>
          <br></br>
          <input className="button" type="submit" value="Delete Players" />
        </form>
      </div>
    </>
  )
}
