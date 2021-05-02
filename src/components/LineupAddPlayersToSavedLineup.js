import React from "react"
import { get, set } from "../helpers/localStorage"
import "../styles/App.css"
import { v4 as uuidv4 } from "uuid"
import createPlayersArray from "../helpers/createPlayersArray"
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
    "alphabetical"
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

  playersArray.forEach((player) => {
    if (playersInLineup.includes(player.id.toString()) === false) {
      playersNotInLineupArray.push(player)
    }
  })

  let playerCount = playersNotInLineupArray.length

  let playersInLineupOptions = playersNotInLineupArray.map((player) => (
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
              id="addPlayerSelector"
              name="playersInLineup"
              multiple={true}
              size={playerCount}
            >
              {playersInLineupOptions}
            </select>
          </label>
          <br></br>
          <br></br>
          <input className="button" type="submit" value="Add Players" />
        </form>
      </div>
    </>
  )
}
