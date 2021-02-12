import React, { useState } from "react"
import "../styles/App.css"

const ButtonGroup = ({ buttons, doAfterClick }) => {
  const [clickedId, setClickedId] = useState(0)

  const handleClick = (event, id) => {
    setClickedId(id)
    doAfterClick(event)
  }
  return (
    <>
      {buttons.map((buttonLabel, i) => (
        <button
          key={i}
          name={buttonLabel}
          onClick={(event) => handleClick(event, i)}
          className={
            i === clickedId
              ? "iframe_button iframe_button--active"
              : "iframe_button"
          }
        >
          {buttonLabel}
        </button>
      ))}
    </>
  )
}

export default ButtonGroup
