import React, { useState } from "react"
import LineupDataService from "../services/LineupService"
import { useObject } from "react-firebase-hooks/database"
import "../styles/App.css"

const Lineup = (props) => {
  console.log("😊😊 props", props)
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
  const [message, setMessage] = useState("")

  const { Lineup } = props
  if (currentLineup.key !== Lineup.key) {
    setCurrentLineup(Lineup)
    setMessage("")
  }
  const [value, loading, error] = useObject(
    LineupDataService.getLineup(Lineup.key, props.firebaseRef)
  )
  const LoadLineup = () => {
    if (!loading && !error) setMessage("Lineup has been loaded.")
    let lineupObj = value.val()
    let savedLineup = lineupObj.lineup
    props.loadLineupFromFirebase(savedLineup)
  }

  const deleteLineup = () => {
    LineupDataService.remove(currentLineup.key, props.firebaseRef)
      .then(() => {
        if (props.lineupCount > 1) props.refreshList()
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
          <p>{message}</p>
        </div>
      ) : (
        <div className="center">
          <br />
          <p>Please click on a Lineup...</p>
        </div>
      )}
    </div>
  )
}

export default Lineup
