import React from "react"
import AddGuestToGoogleSheet from "./AddGuestToGoogleSheet"

export default function AddGuest({
  handleSubmitGuest,
  guestGHINNumber,
  handleChangeGuestGHINNumber,
  guestLastName,
  handleChangeGuestLastName,
  handleAddGuestToAllGamesChange,
  addGuestToAllGames,
}) {
  return (
    <>
      <div className="div--center div--bordered">
        <h4>To add guests to your game(s):</h4>
        <h4>First, add your guests one at a time here:</h4>
        <div className="div--bordered">
          <h5>
            Enter guest's GHIN Number
            <br />
            or leave GHIN Number blank
            <br />
            if you don't have it.
          </h5>
          <h5>
            If you leave GHIN Number blank,
            <br />
            you may enter first and last name
            <br />
            in the "Last Name" box.
          </h5>
          <form onSubmit={handleSubmitGuest}>
            <label>
              GHIN Number:&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                value={guestGHINNumber}
                onChange={handleChangeGuestGHINNumber}
              />
            </label>
            <br />
            <label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last
              Name:&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                value={guestLastName}
                onChange={handleChangeGuestLastName}
              />
            </label>
            <br />
            <br />
            <input type="submit" className="button" value="Add Guest" />
          </form>
          <h5>
            Uncheck this box to add the guest
            <br />
            only to the current game:
          </h5>
          <input
            className="checkbox"
            type="checkbox"
            id="addGuestToAllGames"
            onChange={handleAddGuestToAllGamesChange}
            defaultChecked={addGuestToAllGames}
          ></input>
          <label htmlFor="addGuestToAllGames">Add Guest to All My Games</label>
          <br />
          <br />
        </div>
        <h4>
          Next, add your guest(s) to your table
          <br />
          of players in Google Sheets here:
        </h4>
        <div className="div--bordered">
          <AddGuestToGoogleSheet />
        </div>
        <br />
      </div>
    </>
  )
}
