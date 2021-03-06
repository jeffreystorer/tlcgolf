import React from "react"
import LinkButton from "./GamesLinkButton"
import { get } from "../helpers/localStorage"

export default function GamesTableCreate() {
  const ghinNumber = get("ghinNumber")
  return (
    <>
      <p className="paragraph--center">
        Before you can display this page,<br></br>
        you must create a table of your players<br></br>
        and games in Google Sheets.<br></br>
        <br></br>
        Do this by adding a new sheet, whose name is<br></br>
        your GHIN Number ({ghinNumber}).<br></br>
        <br></br>
        You may copy another user's table and then edit it.<br></br>
        You may give your games any name you wish (no spaces).
      </p>
      <p className="paragraph--center">
        When you have created your table,<br></br>
        go back to this app with your browser<br></br>and login again.
      </p>
      <br></br>
      <LinkButton title={"Create Table"} />
    </>
  )
}
