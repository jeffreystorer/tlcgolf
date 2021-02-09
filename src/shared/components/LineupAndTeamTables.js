import React from "react"
import styled from "styled-components"

const Div = styled.div`
  text-align: center;
  background-color: white;
  padding: 10px 10px 10px 10px;
`

export default function LineupAndTeamTables({
  showIndividualHandicaps,
  playingDate,
  courseName,
  progs069,
  progAdjMessage,
  textAreaValue,
  generateExportLineupTeamTables,
  generateExportTeamsTeamTables,
  handleTextAreaValueChange,
  handleTextAreaOnBlur,
}) {
  let generateTables = generateExportLineupTeamTables
  if (!showIndividualHandicaps) generateTables = generateExportTeamsTeamTables

  return (
    <>
      <Div id="lineup-table-div">
        <table id="lineup-table">
          <thead className="lineup-table-head">
            <tr className="lineup-table-head">
              <td className="center">{playingDate + " at " + courseName}</td>
            </tr>
            <tr>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{generateTables()}</td>
            </tr>
          </tbody>
          <tfoot>
            {progs069 > 0 && showIndividualHandicaps && (
              <>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td className="team-table-footer">{progAdjMessage}</td>
                </tr>
              </>
            )}

            <tr>
              <td className="center text-area-cell">
                <textarea
                  id="lineup-textarea"
                  // @ts-ignore
                  rows="8"
                  cols="39"
                  value={textAreaValue}
                  onChange={handleTextAreaValueChange}
                  onFocus={(event) => (event.target.value = textAreaValue)}
                  onBlur={handleTextAreaOnBlur}
                ></textarea>
              </td>
            </tr>
          </tfoot>
        </table>
      </Div>
    </>
  )
}
