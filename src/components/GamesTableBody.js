import React from "react"
import createGamesTableBodyRows from "../helpers/createGamesTableBodyRows.js"
import { useRecoilValue } from "recoil"
import * as state from "../state"

const GamesTableBody = ({ ratings, slopes, pars }) => {
  const course = useRecoilValue(state.courseState)
  const game = useRecoilValue(state.gameState)
  const games = useRecoilValue(state.gamesState)
  const teesSelected = useRecoilValue(state.teesSelectedState)

  let rows = createGamesTableBodyRows(
    course,
    game,
    games,
    teesSelected,
    ratings,
    slopes,
    pars
  )
  let rowsTD = []
  let colCount = rows[0].length

  function generateRows() {
    for (var i = 0; i < rows.length; i++) {
      rowsTD[i] = (
        <tr key={i}>
          <td className="games-table-body-row_td-left">{rows[i][0]}</td>
          {generateCols(i)}
        </tr>
      )
    }
    return rowsTD
  }

  function generateCols(i) {
    let tds = []
    for (var j = 1; j < colCount; j++) {
      tds[j] = (
        <td className="games-table-body-row_td-other" key={j}>
          {rows[i][j]}
        </td>
      )
    }
    return tds
  }

  return <>{generateRows()}</>
}

export default GamesTableBody
