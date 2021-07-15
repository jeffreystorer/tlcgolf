import React, { useState } from "react"
import { set } from "../helpers/localStorage"
import { useList } from "react-firebase-hooks/database"
import LineupDataService from "../services/LineupService"
import Lineup from "./Lineup"
import "../styles/App.css"

const LineupsList = ({
  resetLineupTitle,
  loadLineupFromFirebase,
  firebaseRef,
  lastKeyIndex,
}) => {
  //const [key, setKey] = useState("notSet")
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
    const { title } = Lineup.val()

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
    set("currentLineupIndex", -1)
  }

  /*   useEffect(() => {
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
        return aLineup
      }
    }
  }, [Lineups, lastKeyIndex, key, loadLineupFromFirebase, firebaseRef]) */

  return (
    <div className="lineups-list">
      <h4>Saved Lineups List</h4>
      <p className="paragraph--center-underline">
        Click on a lineup to edit, export, or delete
      </p>

      {error && <strong>Error: {error}</strong>}
      {loading && <span>Loading...</span>}
      <ul className="list--text-align-left">
        {!loading &&
          Lineups &&
          Lineups.map((Lineup, index) => (
            <li
              className={index === currentIndex ? "active li" : "li"}
              onClick={() => setActiveLineup(Lineup, index)}
              key={index}
            >
              {Lineup.val().title}
            </li>
          ))}
      </ul>

      <button className="button" onClick={removeAllLineups}>
        Delete All
      </button>

      {currentLineup ? (
        <div className="div--center">
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
        <>
          <br />
          <br />
        </>
      )}
    </div>
  )
}

export default LineupsList
