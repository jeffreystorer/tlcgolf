import React from "react"
import IndividualTableHeader from "../components/IndividualTableHeader"
import CHTableBody from "../components/CHTableBody"
import TSTableBody from "../components/TSTableBody"
import { get } from "../../../shared/helpers/localStorage"
import fetchIndividualGHIN from "../helpers/fetchIndividualGHIN"
import fetchCourseData from "../../../shared/helpers/fetchCourseData"

import styled from "styled-components"

const StyledDivGolfer = styled.div`
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  font: 16px sans-serif;
  width: 90%;
`
const StyledParagraph = styled.p`
  text-align: center;
`
const StyledTable = styled.table`
  margin-left: auto;
  margin-right: auto;
  font: 16px sans-serif;
  width: 90%;
`

export default function IndividualPage() {
  const dataMode = get("dataMode")
  const [index, gender, golfer] = fetchIndividualGHIN(dataMode)
  const [ratings, slopes, pars] = fetchCourseData()

  let teesSelected = get("teesSelected")

  return (
    <>
      <StyledDivGolfer>{golfer}</StyledDivGolfer>
      <br />
      <div id="individual-table">
        <StyledTable id="ch-table">
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
        </StyledTable>
        <br />
        <StyledTable id="ts-table">
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
        </StyledTable>
        <br></br>
        <StyledParagraph>
          *Score you must average eight out of your<br></br>last twenty rounds
          to maintain your index.
        </StyledParagraph>
      </div>
    </>
  )
}
