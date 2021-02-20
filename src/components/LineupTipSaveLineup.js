import React from "react"

export default function LineupTipSaveLineup() {
  return (
    <>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>To save a lineup:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="table-tip_td">
                Click the "Save Lineup" button and your lineup will be saved to
                storage in the cloud. You can load a saved lineup by clicking
                the "Saved Lineups" button near the top of this page. Your saved
                lineups are available on any device where you run the app, not
                just the one on which you created the lineup. Also, if you make
                a lineup one day and come back to it the next, the course
                handicaps will be automatically updated using the players'
                current indexes.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
