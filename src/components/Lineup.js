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
  const editLineup = () => {
    let lineupObj = value.val()
    let title = lineupObj.title
    let savedLineup = lineupObj.lineup
    savedLineup.title = title
    props.loadLineupFromFirebase(savedLineup)
  }

  const exportLineup = () => {
    document.location = "/export"
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
    <div className="div--center">
      {currentLineup ? (
        <>
          <h4>Lineup</h4>
          <p>{currentLineup.title}</p>
          <button className="button" onClick={editLineup}>
            Edit
          </button>
          <button className="button" onClick={exportLineup}>
            Export
          </button>
          <button className="button" onClick={deleteLineup}>
            Delete
          </button>
        </>
      ) : (
        <>
          <br />
          <p>Please click on a Lineup...</p>
        </>
      )}
      <br />
    </div>
  )
}

export default Lineup
