import React, { useState, useEffect } from "react"
import "../styles/App.css"
import LineupTable from "./LineupTable"
import fetchCourseData from "../helpers/fetchCourseData"
import fetchGamesGHIN from "../helpers/fetchGamesGHIN"

export default function LineupPage() {
  const [loading, setLoading] = useState(true)
  const [ratings, slopes, pars] = fetchCourseData()

  useEffect(() => {
    fetchGamesGHIN(setLoading)
  }, [])

  if (loading) return "Loading . . ."
  return (
    <>
      <LineupTable ratings={ratings} slopes={slopes} pars={pars} />
    </>
  )
}
