import React from "react"
import { Route, Redirect } from "react-router-dom"
import "../styles/App.css"
import PlayersTable from "./PlayersTable"
import { get } from "../functions/localStorage"
import fetchCourseData from "../functions/fetchCourseData"

export default function PlayersPage() {
  const [ratings, slopes, pars] = fetchCourseData()
  /*  We are only going to display the tables if the golfer is logged in  */
  const isLoggedIn = get("isLoggedIn")
  if (isLoggedIn === "true") {
    return (
      <>
        <PlayersTable ratings={ratings} slopes={slopes} pars={pars} />
      </>
    )
  } else {
    return (
      <Route exact path="/players">
        <Redirect to="/settings/login" />
      </Route>
    )
  }
}
