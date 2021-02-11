import React, { useState } from "react"

export default function IframesCasey() {
  let iframe
  const [clickedId, setClickedId] = useState(-1)
  const [none, setNone] = useState(true)
  const [mon, setMon] = useState(false)
  const [fri, setFri] = useState(false)
  const handleButtonClick = (event) => {
    iframe = event.target.id
    switch (iframe) {
      case "None":
        setNone(true)
        setMon(false)
        setFri(false)
        break
      case "Mon":
        setNone(false)
        setMon(true)
        setFri(false)
        break
      case "Wed":
        setNone(false)
        setMon(false)
        setFri(false)
        break
      case "Fri":
        setNone(false)
        setMon(false)
        setFri(true)
        break

      default:
        break
    }
  }
  const ButtonGroup = ({ buttons }) => {
    return (
      <>
        {buttons.map((buttonLabel, i) => (
          <button
            key={i}
            className="button"
            onClick={handleButtonClick}
            name={buttonLabel}
          >
            {buttonLabel}
          </button>
        ))}
      </>
    )
  }

  return (
    <>
      <h1>Clicked: {clickedId}</h1>
      <ButtonGroup buttons={["None", "Mon", "Fri"]} />
      {none && <div></div>}
      {mon && (
        <div>
          <iframe
            src="https://docs.google.com/spreadsheets/d/1JxSAKGRCQcRKJLn0WPodex1Q_T5BrRrDGCpEqxPyDV0/edit#gid=1358320276"
            width="90%"
            height="600"
            title="Mon"
          ></iframe>
        </div>
      )}
      {fri && (
        <div>
          <iframe
            src="https://docs.google.com/spreadsheets/d/1JxSAKGRCQcRKJLn0WPodex1Q_T5BrRrDGCpEqxPyDV0/edit#gid=765826263"
            width="90%"
            height="800"
            title="Fri"
          ></iframe>
        </div>
      )}
    </>
  )
}
