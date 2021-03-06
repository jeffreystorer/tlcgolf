import React, { useState } from "react"
import ButtonGroup from "./GamesIframesButtonGroup"

export default function IframesStorer() {
  let iframe = "None"
  const [noneButton, setNone] = useState(true)
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

  return (
    <>
      <h3>Schedules</h3>
      <ButtonGroup
        buttons={["None", "Mon", "Wed", "Fri"]}
        doAfterClick={selectIframeContents}
      />
      {noneButton && <div></div>}
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
