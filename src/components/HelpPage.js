import React from 'react';

export default function HelpPage(){
    return(
      <div align="center">
      <br></br>
      <table id="help-table">
      <tbody>
        <tr>
          <td>
            <table id='games-table-help'>
            <caption>Games Page</caption><br></br>
              <tbody>
                <tr>
                  <td className='help-topic'>
                    Table of Players and Games
                  </td>
                  <td>
                    The players in your games are listed in a table in a Google Sheets 
                    spreadsheet.  You may have had this table created for you by me before you
                    first used the app.  If not, you will be prompted to create it when
                    you first login.  You can edit your
                    players and games by clicking the "Edit Table" button on the Games page.
                    This will take you to a Google Sheets spreadsheet called "TLC-Golf" with a separate sheet for
                    each user of this app, named with the user's GHIN Number.  On most devices, clicking the
                    "Edit Table" button will take you directly to your own sheet.  On an iPad, you will have to
                    find your sheet among the tabs shown at the bottom and click on it.  When you finish creating
                    or edit your table, use the browser's back button to return to the app.  When you
                    edit your table, you will be required to login again.  You will also lose your saved lineup
                    (see below).

                  </td>
                </tr>
                <br></br>
                <tr>
                  <td>

                  </td>
                  <td>
                  For your convenience in adding players to your table, the TLC-Golf Google Sheets spreadsheet 
                  includes a sheet titled "GHIN_Numbers", which has GHIN numbers and local numbers
                   for all players in the club.  This sheet is updated from time to time and may not always 
                   include new members who joined recently.
                  </td>
                </tr>
                <br></br>
                <tr>
                  <td>

                  </td>
                  <td>
                  <span style={{fontWeight: "bold"}} >To add a guest</span> to the player's list for a game, 
                  edit your table to add a player
                  at the bottom, using the dummy value 9999990 as the player's GHIN number and the player's full name
                  in the "Last_Name" column.  See the sheet for user 585871 for an example.  
                  If you want to add more than one guest, use the next consecutive dummy value (e.g.,
                  9999991) and so on.  You should add your guest(s) to your table before making a lineup that
                  will include the guest(s).
                  </td>
                </tr>
                
              </tbody>
         </table>
          </td>
        </tr>
        <br></br>
        <tr>
          <td>
          <table id='lineup-table-help'>
            <caption>Lineup Page</caption><br></br>
              <tbody>
                <tr>
                  <td className='help-topic'>
                    Creating a Lineup
                  </td>
                  <td>
                    1.  Go to the Games page and select your Game and Course.
                      Then go the Lineup page.  Use the first row of dropdowns to choose your playing
                      date, number of tee times, and link time.  If you are going to play progs, 
                      make a choice under the "Progs Y/N?" dropdown.  If you wish to require threesomes 
                      to make three more points per eighteen holes, make a choice under the "Progs Adj?" dropdown.
                        Choose "3 plus 3" to add three points per eighteen holes to threesomes's team progs or "4 minus 3" 
                        to subtract three points per eighteen holes from the foursomes' team progs.
                  </td>
                </tr>
                <br></br>
                <tr>
                  <td className='help-topic'>
                    
                  </td>
                  <td>
                    2.  Use the tee time dropdowns to add players to a team.  To remove a player from a team,
                    click on the player's name.
                  </td>
                </tr>
                <br></br>
                <tr>
                  <td className='help-topic'>
                    
                  </td>
                  <td>
                    3.  Use the tee choice dropdown to the right of the player's course handicaps 
                    to choose the tee the player will play from.
                  </td>
                </tr>
                <br></br>
                <tr>
                  <td className='help-topic'>
                    
                  </td>
                  <td>
                    4.  If you wish to set a player's handicap manually, click the * at the
                    right end of the player's row, which will bring up a dropdown of course handicaps.
                    When you select a manual course handicap, it is assigned to the player's
                    chosen tee.  To switch a player back to automatic course handicap calculation,
                    choose "Auto" from the * dropdown menu.
                  </td>
                </tr>
                <br></br>
                <tr>
                  <td className='help-topic'>
                    
                  </td>
                  <td>
                    5.  Type your bets and other information about the game in the box
                    at the bottom: [Bets, Entry, Prize, Rules].
                  </td>
                </tr>
                <br></br>
                <tr>
                  <td className='help-topic'>
                    Saving a Lineup
                  </td>
                  <td>
                    The app automatically saves the lineup for the latest combination of Game and Course.
                    You can come back to the saved lineup later by going to the Games page and choosing 
                    that combination of Game and Course.  If you choose a different combination of Game and Course, 
                    your saved lineup will be replaced with the lineup for the new combination.  
                    Also, if you make a lineup one day and come back to it the
                     next, the course handicaps will be automatically updated using the players'
                    current indexes.
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