import React from "react"
import "../styles/App.css"
import LineupTable from "./LineupTable"
import { get } from "../../functions/localStorage"
import fetchCourseData from "../Shared/functions/fetchCourseData"
import fetchGamesGHIN from "../../functions/fetchGamesGHIN"

export default function LineupPage() {
  const [ratings, slopes, pars] = fetchCourseData()
  let dataMode = get("dataMode")
  fetchGamesGHIN(dataMode)
  return (
    <>
      <LineupTable ratings={ratings} slopes={slopes} pars={pars} />
    </>
  )
}
