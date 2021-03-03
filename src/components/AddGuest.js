import React from "react"

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
        <h4>Add Guest</h4>
        <h5>
          Leave GHIN Number blank
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
        <br />
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
    </>
  )
}
