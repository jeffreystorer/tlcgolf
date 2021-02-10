import React from "react"
import IndividualTableHeader from "./IndividualTableHeader"
import CHTableBody from "./IndividualCHTableBody""
import TSTableBody from "./IndividualTSTableBody"
import "../styles/App.css"
import { get } from "../helpers/localStorage"
import fetchIndividualGHIN from "../helpers/fetchIndividualGHIN"
import fetchCourseData from "../helpers/fetchCourseData"

export default function IndividualPage() {
  const dataMode = get("dataMode")
  const [index, gender, golfer] = fetchIndividualGHIN(dataMode)
  const [ratings, slopes, pars] = fetchCourseData()

  let teesSelected = get("teesSelected")

  return (
    <>
      <div className="center golfer-center">{golfer}</div>
      <br />
      <div id="individual-table">
        <table id="ch-table">
          <thead>
            <IndividualTableHeader tableName="CrsHcp" />
          </thead>
          <tbody>
            <CHTableBody
              index={index}
              gender={gender}
              teesSelected={teesSelected}
              ratings={ratings}
              slopes={slopes}
              pars={pars}
            />
          </tbody>
        </table>
        <br />
        <table id="ts-table">
          <thead>
            <IndividualTableHeader tableName="Score*" />
          </thead>
          <tbody>
            <TSTableBody
              index={index}
              gender={gender}
              teesSelected={teesSelected}
              ratings={ratings}
              slopes={slopes}
              pars={pars}
            />
          </tbody>
        </table>
        <br></br>
        <p className="center">
          *Score you must average eight out of your<br></br>last twenty rounds
          to maintain your index.
        </p>
      </div>
    </>
  )
}
