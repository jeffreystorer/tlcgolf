import React from "react"
import "../Lineup.css"
import LineupTable from "../components/LineupTable"
import { get } from "../../../shared/helpers/localStorage"
import fetchCourseData from "../../../shared/helpers/fetchCourseData"
import fetchGamesGHIN from "../../../shared/helpers/fetchGamesGHIN"

export default function LineupPage() {
  const [ratings, slopes, pars] = fetchCourseData()
  let dataMode = get("dataMode")
  let hasGoogleSheet = get("hasGoogleSheet")
  if (hasGoogleSheet === "true") fetchGamesGHIN(dataMode)
  return (
    <>
      <LineupTable ratings={ratings} slopes={slopes} pars={pars} />
    </>
  )
}
