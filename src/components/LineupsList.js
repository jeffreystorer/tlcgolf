import React, { useState } from "react"
import { useList } from "react-firebase-hooks/database"
import LineupDataService from "../services/LineupService"
import Lineup from "./Lineup"
import "../styles/App.css"

const LineupsList = ({ loadLineupFromFirebase, firebaseRef }) => {
  const [currentLineup, setCurrentLineup] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(-1)

  /* use react-firebase-hooks */
  const [Lineups, loading, error] = useList(
    LineupDataService.getAll(firebaseRef)
  )
  const refreshList = () => {
    setCurrentLineup(null)
    setCurrentIndex(-1)
  }

  const setActiveLineup = (Lineup, index) => {
    const { title } = Lineup.val() /* Lineup */

    setCurrentLineup({
      key: Lineup.key,
      title,
    })

    setCurrentIndex(index)
  }

  const removeAllLineups = () => {
    LineupDataService.removeAll(firebaseRef).catch((e) => {
      console.log(e)
    })
  }

  return (
    <div className="center list-lineups">
      <h4>Saved Lineups List</h4>

      {error && <strong>Error: {error}</strong>}
      {loading && <span>Loading...</span>}
      <ul>
        {!loading &&
          Lineups &&
          Lineups.map((Lineup, index) => (
            <li
              className={index === currentIndex ? "active" : ""}
              onClick={() => setActiveLineup(Lineup, index)}
              key={index}
            >
              {Lineup.val().title}
            </li>
          ))}
      </ul>

      <button onClick={removeAllLineups}>Delete All</button>

      {currentLineup ? (
        <div className="center">
          <Lineup
            lineupCount={Lineups.length}
            Lineup={currentLineup}
            refreshList={refreshList}
            loadLineupFromFirebase={loadLineupFromFirebase}
            firebaseRef={firebaseRef}
          />
        </div>
      ) : (
        <div className="center">
          <br></br>
          <p>Please click on a Lineup to load or delete it...</p>
        </div>
      )}
    </div>
  )
}

export default LineupsList
