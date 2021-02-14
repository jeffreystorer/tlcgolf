import React from "react"

export default function HelpPage() {
  return (
    <div className="div--center">
      <br></br>
      <table className="help-table">
        <tbody>
          <tr>
            <td>
              <table className="table">
                <caption className="caption">Games Page</caption>
                <br></br>
                <tbody>
                  <tr>
                    <td className="help-table_topic">
                      Table of Players and Games
                    </td>
                    <td className="help-table_text">
                      The players in your games are listed in a table in a
                      Google Sheets spreadsheet. You may have had this table
                      created for you by me before you first used the app. If
                      not, you will be prompted to create it when you first
                      login. You can edit your players and games by clicking the
                      "Edit Table" button on the Games page. This will take you
                      to a Google Sheets spreadsheet called "TLC-Golf" with a
                      separate sheet for each user of this app, named with the
                      user's GHIN Number. On most devices, clicking the "Edit
                      Table" button will take you directly to your own sheet. On
                      an iPad, you will have to find your sheet among the tabs
                      shown at the bottom and click on it. When you finish
                      creating or editing your table, use the browser's back
                      button to return to the app. After you edit your table,
                      you will be required to login again.
                    </td>
                  </tr>
                  <br></br>
                  <tr>
                    <td></td>
                    <td className="help-table_text">
                      For your convenience in adding players to your table, the
                      TLC-Golf Google Sheets spreadsheet includes a sheet named
                      "GHIN_Numbers", which has GHIN numbers and local numbers
                      for all players in the club. This sheet is updated from
                      time to time and may not always include new members who
                      joined recently.
                    </td>
                  </tr>
                  <br></br>
                  <tr>
                    <td></td>
                    <td className="help-table_text">
                      <span style={{ fontWeight: "bold" }}>To add a guest</span>{" "}
                      to the player's list for a game: if you know the guest's
                      GHIN number, simply add the player to your list. Your list
                      is not limited to club members; it can include any player
                      with a GHIN number. If you don't know the guest's GHIN
                      number, then add the player at the bottom of your list,
                      using the dummy value 9999990 as the player's GHIN number
                      and the player's full name in the "Last_Name" column. If
                      you want to add more than one guest, use the next
                      consecutive dummy value (e.g., 9999991) and so on. For a
                      guest whose GHIN number you don't know, you will simply
                      specify a manual course handicap from a chosen tee in your
                      lineup (see below). Whether or not you know the GHIN
                      number, you should add your guest(s) to your table before
                      making a lineup that will include the guest(s).
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <br></br>
          <tr>
            <td>
              <table className="table">
                <caption className="caption">Players Page</caption>
                <br></br>
                <tbody>
                  <tr>
                    <td className="help-table_topic">Randomizing Your List</td>
                    <td className="help-table_text">
                      After you select a game and course on the Games page, if
                      you wish to create a lineup, go the Players page to select
                      your players. If you wish to have a random list, check the
                      "Random Teams" box. This will randomize the list of
                      players in your lineup that appears in the teetime
                      dropdowns on the Lineup page. You can go back to
                      alphabetical order by unchecking the box. If you check it
                      again, you will get a different randomized list. The
                      random list with which you make a lineup will be saved
                      with the lineup and restored when you load the saved
                      lineup.
                    </td>
                  </tr>
                  <br></br>

                  <tr>
                    <td className="help-table_topic">Selecting Your Players</td>
                    <td className="help-table_text">
                      On a mobile device, click on the ... or dropdown arrow in
                      the dropdown box below "Select Players for Lineup", and
                      check the players you wish to select. On a desktop or
                      laptop computer, hold down the Ctrl (Windows) or Command
                      (Mac) button and click on each player to select multiple
                      players. Then click "Next" to go the Lineup page.
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <br></br>
          <tr>
            <td>
              <table className="table">
                <caption className="caption">Lineup Page</caption>
                <br></br>
                <tbody>
                  <tr>
                    <td className="help-table_topic">Creating a Lineup</td>
                    <td className="help-table_text">
                      Go to the Games page and select your game and course, and
                      then to the Players page to select your players. Then
                      click "Next" to go the Lineup page. Use the first row of
                      dropdowns to choose your playing date, number of tee
                      times, and link time. If you are going to play progs, make
                      a choice under the "Progs Y/N?" dropdown. If you wish to
                      require threesomes to make three more points per eighteen
                      holes, make a choice under the "Progs Adj?" dropdown.
                      Choose "3 plus 3" to add three points per eighteen holes
                      to threesomes's team progs or "4 minus 3" to subtract
                      three points per eighteen holes from the foursomes' team
                      progs.
                    </td>
                  </tr>
                  <br></br>
                  <tr>
                    <td className="help-table_topic">
                      Auto-Populate Tee Times
                    </td>
                    <td className="help-table_text">
                      If you wish to automatically assign tees times in the
                      order of your list of players, click the "Auto-Popluate"
                      button. This is intended to be used with a randomized list
                      of players. The tee times will be populated in order from
                      your list. Threesomes will go off before foursomes. If
                      your player count is divisible by three, then you can
                      control whether to have all threesomes by choosing the
                      correct number of tee times. For example, if you have
                      twelve players, choose three times to play in foursomes or
                      four times to play in threesomes. With fifteen players,
                      choose five times to play in threesomes or four times to
                      play as a mixed group.
                    </td>
                  </tr>
                  <br></br>
                  <tr>
                    <td className="help-table_topic">
                      Manually Populate Tee Times
                    </td>
                    <td className="help-table_text">
                      Use the tee time dropdowns to add players to a team. To
                      remove a player from a team, click on the player's name.
                    </td>
                  </tr>
                  <br></br>
                  <tr>
                    <td className="help-table_topic">
                      Choose Tees for Each Player
                    </td>
                    <td className="help-table_text">
                      Use the tee choice dropdown to the right of the player's
                      course handicaps to choose the tee the player will play
                      from. This choice drives the computation of the Team
                      Handicap and Progs.
                    </td>
                  </tr>
                  <br></br>
                  <tr>
                    <td className="help-table_topic">
                      To Override a Player's GHIN course handicap
                    </td>
                    <td className="help-table_text">
                      Click the * at the right end of the player's row, which
                      will bring up a dropdown of course handicaps. When you
                      select a manual course handicap, it is assigned to the
                      player's chosen tee. To switch a player back to automatic
                      GHIN course handicap calculation, choose "Auto" from the *
                      dropdown menu.
                    </td>
                  </tr>
                  <br></br>
                  <tr>
                    <td className="help-table_topic">Setting Your Bets</td>
                    <td className="help-table_text">
                      Type your bets and other information about the game in the
                      text box at the bottom.
                    </td>
                  </tr>
                  <br></br>
                  <tr>
                    <td className="help-table_topic">Saving a Lineup</td>
                    <td className="help-table_text">
                      At the bottom of the Lineup page, there is a "Save Lineup"
                      button. Click this and your lineup will be saved to
                      storage in the cloud. Your saved lineups are available on
                      any device where you run the app, not just the one on
                      which you created the lineup. Also, if you make a lineup
                      one day and come back to it the next, the course handicaps
                      will be automatically updated using the players' current
                      indexes.
                    </td>
                  </tr>
                  <br></br>
                  <tr>
                    <td className="help-table_topic">
                      Retrieving a Saved Lineup
                    </td>
                    <td className="help-table_text">
                      Once you have created and saved one or more lineups, you
                      will be taken directly to the Lineup page when you start
                      the app and your last saved lineup will be selected for
                      you, so that you can just click on "Load". Or select a
                      different lineup and click on "Load".
                    </td>
                  </tr>
                  <br></br>
                  <tr>
                    <td className="help-table_topic">
                      Clearing the curent lineup
                    </td>
                    <td className="help-table_text">
                      If you wish to clear the current lineup without changing
                      your selection of players, simply refresh your browser.
                    </td>
                  </tr>
                  <br></br>
                  <tr>
                    <td className="help-table_topic">
                      Downloading a Screenshot
                    </td>
                    <td className="help-table_text">
                      Click the "Export" button in the Saved Lineups List. This
                      will publish the lineup to the Exports page and take you
                      there. You will have the option of downloading a
                      screenshot for emailing or a pdf with a 2x2 collage for
                      use as handouts.
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
