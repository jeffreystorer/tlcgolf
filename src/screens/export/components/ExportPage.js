import React from "react"
import { get } from "../../../shared/helpers/localStorage"
import { useList } from "react-firebase-hooks/database"
import LineupDataService from "../../../shared/services/LineupService"
import ExportTable from "../components/ExportTable"

export default function ExportPage() {
  let currentLineupIndex = get("currentLineupIndex")
  let ghinNumber = get("ghinNumber")
  const firebaseRef = '"' + ghinNumber.toString() + '"'

  const [Lineups, loading, error] = useList(
    LineupDataService.getAll(firebaseRef)
  )
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
        <ExportTable lineupTitle={title} lineup={lineup} />
      </>
    )
  } else {
    return null
  }
}
