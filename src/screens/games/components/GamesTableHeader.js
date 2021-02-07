import React from "react"
import createGamesAndLineupTableHeaderRow from "../../../shared/helpers/createGamesAndLineupTableHeaderRow"
import { useRecoilValue } from "recoil"
import { teesSelectedState } from "../../../shared/state"

export default function GamesTableHeader() {
  const teesSelected = useRecoilValue(teesSelectedState)
  let cols = createGamesAndLineupTableHeaderRow(teesSelected)
  const getHeader = () => {
    var keys = cols
    return keys.map((key, index) => {
      return (
        <th className="game-header-cell" key={index} scope="col">
          {key}
        </th>
      )
    })
  }

  return (
    <>
      <tr className="game-header-row">{getHeader()}</tr>
    </>
  )
}
