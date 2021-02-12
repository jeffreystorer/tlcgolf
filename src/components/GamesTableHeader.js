import React from "react"
import createGamesAndLineupTableHeaderRow from "../helpers/createGamesAndLineupTableHeaderRow"
import { useRecoilValue } from "recoil"
import { teesSelectedState } from "../state"

export default function GamesTableHeader() {
  const teesSelected = useRecoilValue(teesSelectedState)
  let cols = createGamesAndLineupTableHeaderRow(teesSelected)
  const getHeader = () => {
    var keys = cols
    return keys.map((key, index) => {
      return (
        <th className="games-table-header_th" key={index} scope="col">
          {key}
        </th>
      )
    })
  }

  return (
    <>
      <tr>{getHeader()}</tr>
    </>
  )
}
