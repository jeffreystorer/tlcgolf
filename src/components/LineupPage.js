import React, { useState, useEffect } from "react"
import "../styles/App.css"
import LineupTable from "./LineupTable"
import GamesTableCreate from "./GamesTableCreate"
import fetchCourseData from "../helpers/fetchCourseData"
import fetchPlayersAndGames from "../helpers/fetchPlayersAndGames"
import fetchGamesGHIN from "../helpers/fetchGamesGHIN"
import Loader from "react-loader-spinner"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { get } from "../helpers/localStorage"

export default function LineupPage() {
  const [loading, setLoading] = useState(true)
  const [ratings, slopes, pars] = fetchCourseData()
  let hasGoogleSheet = get("hasGoogleSheet")

  useEffect(() => {
    if (hasGoogleSheet === "true") {
      fetchPlayersAndGames()
      fetchGamesGHIN(setLoading)
    } else {
      setLoading(false)
    }
  }, [hasGoogleSheet])

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }

  if (loading) {
    return (
      <Loader
        style={style}
        type="Circles"
        color="#3378AC"
        height={80}
        width={80}
      />
    )
  }
  if (hasGoogleSheet === "true") {
    return (
      <>
        <LineupTable ratings={ratings} slopes={slopes} pars={pars} />
      </>
    )
  } else {
    return (
      <>
        <GamesTableCreate />
      </>
    )
  }
}
