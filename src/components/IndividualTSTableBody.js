import React from "react"
import createIndividualTableBodyRows from "../helpers/createIndividualTableBodyRows"

const TSTableBody = (props) => {
  const rows = createIndividualTableBodyRows(
    "TS",
    props.index,
    props.gender,
    props.teesSelected,
    props.ratings,
    props.slopes,
    props.pars
  )
  return (
    <>
      {rows.map(function (row, i) {
        return (
          <tr key={i}>
            <td className="individual-table-body-row_td-left">{row[0]}</td>
            <td className="individual-table-body-row_td-other">{row[1]}</td>
            <td className="individual-table-body-row_td-other">{row[2]}</td>
            <td className="individual-table-body-row_td-other">{row[3]}</td>
            <td className="individual-table-body-row_td-other">{row[4]}</td>
            <td className="individual-table-body-row_td-other">{row[5]}</td>
            <td className="individual-table-body-row_td-other">{row[6]}</td>
          </tr>
        )
      })}
    </>
  )
}

export default TSTableBody
