import React from "react"
import { DivCenteredBackgroundWhite } from "./StyledComponents"

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
      <DivCenteredBackgroundWhite id="lineup-table-div">
        <table id="lineup-table" className="background-white">
          <thead className="lineup-table-head background-white">
            <tr className="lineup-table-head background-white">
              <td className="center">{playingDate + " at " + courseName}</td>
            </tr>
            <tr>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="background-white">{generateTables()}</td>
            </tr>
          </tbody>
          <tfoot>
            {progs069 > 0 && showIndividualHandicaps && (
              <>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td className="team-table-footer background-white">
                    {progAdjMessage}
                  </td>
                </tr>
              </>
            )}

            <tr>
              <td className="center text-area-cell background-white">
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
      </DivCenteredBackgroundWhite>
    </>
  )
}
