import React from "react"
import { Route, Redirect } from "react-router-dom"
import "../styles/App.css"
import LineupTable from "./LineupTable"
import { get } from "../functions/localStorage"
import fetchCourseData from "../functions/fetchCourseData"
import fetchGamesGHIN from "../functions/fetchGamesGHIN"

export default function LineupPage() {
  const [ratings, slopes, pars] = fetchCourseData()
  /*  We are only going to display the tables if the golfer is logged in  */
  const isLoggedIn = get("isLoggedIn")
  let dataMode = get("dataMode")

  if (isLoggedIn === "true") {
    fetchGamesGHIN(dataMode)
    return (
      <>
        <LineupTable ratings={ratings} slopes={slopes} pars={pars} />
      </>
    )
  } else {
    return (
      <Route exact path="/">
        <Redirect to="/settings/login" />
      </Route>
    )
  }
}
