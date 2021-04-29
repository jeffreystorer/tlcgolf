import React from "react"
import "../styles/App.css"
import { get, set } from "../helpers/localStorage"
import { createBrowserHistory } from "history"
let history = createBrowserHistory()

const LinkButton = ({ title }) => {
  const sheetURL = get("sheetURL")

  function handleClick() {
    set("isLoggedIn", "false")
    history.push("/settings/login")
    document.location = "/settings/login"
    document.location = sheetURL
  }

  return (
    <>
      <div className="div--center">
        <button className="button" onClick={handleClick}>
          {title}
        </button>
      </div>
    </>
  )
}

export default LinkButton
