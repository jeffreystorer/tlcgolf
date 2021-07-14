import React from "react"
import { get } from "../helpers/localStorage"
import { useList } from "react-firebase-hooks/database"
import LineupDataService from "../services/LineupService"
import ExportTableAll from "./ExportTableAll"
//import { Redirect } from "react-router-dom"

export default function ExportTableNext() {
  let currentLineupIndex = get("currentLineupIndex")
    ? get("currentLineupIndex")
    : -1
  let ghinNumber = get("ghinNumber")
  const firebaseRef = '"' + ghinNumber.toString() + '"'

  const [Lineups, loading, error] = useList(
    LineupDataService.getAll(firebaseRef)
  )

  if (currentLineupIndex < 0) {
    document.location = "/lineup"
    //return <Redirect to="/" />
  }
  let lineup, title

  if (!loading && !error) {
    let aLineup = Lineups[currentLineupIndex]
    let savedLineup = aLineup.val()
    lineup = savedLineup.lineup
    title = savedLineup.title
  }

  if (!loading && !error) {
    return (
      <>
        <ExportTableAll lineupTitle={title} lineup={lineup} />
      </>
    )
  } else {
    return null
  }
}
