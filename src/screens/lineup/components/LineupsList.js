import React, { useState, useEffect } from "react"
import { set } from "../../../shared/helpers/localStorage"
import { useList } from "react-firebase-hooks/database"
import LineupDataService from "../../../shared/services/LineupService"
import Lineup from "../components/Lineup"
import "../Lineup.css"

const LineupsList = ({
  resetLineupTitle,
  loadLineupFromFirebase,
  firebaseRef,
  lastKeyIndex,
}) => {
  const [key, setKey] = useState("notSet")
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
    set("currentLineupIndex", index)
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

  useEffect(() => {
    //eslint-disable-next-line
    let savedLineups = []
    if (lastKeyIndex > -1) {
      savedLineups = Lineups.map(myFunction)
      function myFunction(Lineup, index) {
        let aLineup = {
          key: Lineup.key,
          title: Lineup.val().title,
        }
        setKey(aLineup.key)
        setCurrentLineup({
          key: aLineup.key,
          title: aLineup.title,
        })
        setCurrentIndex(index)
        set("currentLineupIndex", index)
        return aLineup
      }
    }
  }, [Lineups, lastKeyIndex, key, loadLineupFromFirebase, firebaseRef])

  return (
    <div className="center list-lineups">
      <h4>Saved Lineups List</h4>

      {error && <strong>Error: {error}</strong>}
      {loading && <span>Loading...</span>}
      <ul className="text-align-left">
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
            resetLineupTitle={resetLineupTitle}
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
