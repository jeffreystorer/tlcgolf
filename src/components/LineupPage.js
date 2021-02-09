import React from "react"
import "../styles/App.css"
import LineupTable from "./LineupTable"
import { get } from "../helpers/localStorage"
import fetchCourseData from "../helpers/fetchCourseData"
import fetchGamesGHIN from "../helpers/fetchGamesGHIN"

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
