import React from "react"

function IndividualTableHeader({ tableName }) {
  let courses = ["DC", "MG", "MW", "OR", "PA", "TP"]
  return (
    <>
      <tr>
        <th scope="col" className="individual-table-header-row_th-left">
          <div className="center">{tableName}</div>
        </th>
        {courses.map(function (courses) {
          return (
            <th className="individual-table-header-row_th-other" scope="col">
              {courses}
            </th>
          )
        })}
      </tr>
    </>
  )
}
export default IndividualTableHeader
