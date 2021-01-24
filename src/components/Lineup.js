import React, { useState } from "react"
import LineupDataService from "../services/LineupService"
import { useObject } from "react-firebase-hooks/database"
import "../styles/App.css"

const Lineup = (props) => {
  const initialLineupState = {
    key: null,
    title: "",
    lineup: {
      allPlayers: "",
      playersInLineup: "",
      players: "",
      game: "",
      course: "",
      playingDate: "",
      teeTimeCount: 0,
      linkTime: "",
      progs069: "0",
      progAdj: "0",
      teamTables: {},
      teamHcpAndProgs: {},
      textAreaValue: "",
    },
  }
  const [currentLineup, setCurrentLineup] = useState(initialLineupState)

  const { Lineup } = props
  if (currentLineup.key !== Lineup.key) {
    setCurrentLineup(Lineup)
  }
  const [value] = useObject(
    LineupDataService.getLineup(Lineup.key, props.firebaseRef)
  )
  const LoadLineup = () => {
    let lineupObj = value.val()
    let title = lineupObj.title
    let savedLineup = lineupObj.lineup
    savedLineup.title = title
    props.loadLineupFromFirebase(savedLineup)
  }

  const deleteLineup = () => {
    LineupDataService.remove(currentLineup.key, props.firebaseRef)
      .then(() => {
        if (props.lineupCount > 1) props.refreshList()
        props.resetLineupTitle()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <div className="center list-lineup">
      {currentLineup ? (
        <div className="center">
          <h4>Lineup</h4>
          <form>
            <div className="center">
              <p>{currentLineup.title}</p>
            </div>
          </form>

          <button type="submit" onClick={LoadLineup}>
            Load
          </button>

          <button onClick={deleteLineup}>Delete</button>
        </div>
      ) : (
        <div className="center">
          <br />
          <p>Please click on a Lineup...</p>
        </div>
      )}
      <br></br>
    </div>
  )
}

export default Lineup
