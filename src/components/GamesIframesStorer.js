import React, { useState } from "react"

export default function IframesStorer() {
  let iframe
  const [none, setNone] = useState(true)
  const [mon, setMon] = useState(false)
  const [wed, setWed] = useState(false)
  const [fri, setFri] = useState(false)
  const selectIframeContents = (event) => {
    iframe = event.target.name
    switch (iframe) {
      case "None":
        setNone(true)
        setMon(false)
        setWed(false)
        setFri(false)
        break
      case "Mon":
        setNone(false)
        setMon(true)
        setWed(false)
        setFri(false)
        break
      case "Wed":
        setNone(false)
        setMon(false)
        setWed(true)
        setFri(false)
        break
      case "Fri":
        setNone(false)
        setMon(false)
        setWed(false)
        setFri(true)
        break

      default:
        break
    }
  }
  const ButtonGroup = ({ buttons }) => {
    const [clickedId, setClickedId] = useState(0)

    const handleClick = (event, i) => {
      setClickedId(i)
      selectIframeContents(event)
    }
    return (
      <>
        <h1> Active: {clickedId}</h1>
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

  return (
    <>
      <ButtonGroup
        buttons={["None", "Mon", "Wed", "Fri"]}
        selectIframeContents={selectIframeContents}
      />
      {none && <div></div>}
      {mon && (
        <div>
          <iframe
            src="https://docs.google.com/spreadsheets/d/169aXDd3951AoUzYZC-83qEhj8okGZiwyzghuC_fLOPc/edit#gid=474922083"
            width="90%"
            height="600"
            title="Mon"
          ></iframe>
        </div>
      )}
      {wed && (
        <div>
          <iframe
            src="https://docs.google.com/spreadsheets/d/1pCE1OFZ3mA7D1kQjlEYUrVY9HyodS0YZFdm8Y5Is0NA/edit#gid=474922083"
            width="90%"
            height="700"
            title="Wed"
          ></iframe>
        </div>
      )}
      {fri && (
        <div>
          <iframe
            src="https://docs.google.com/spreadsheets/d/1feHDG0F71oZLyaMvU0CADGCN-VIcbL-8UJD3kgYVzIE/edit#gid=0"
            width="90%"
            height="800"
            title="Fri"
          ></iframe>
        </div>
      )}
    </>
  )
}
