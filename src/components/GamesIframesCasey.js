import React, { useState } from "react"
import ButtonGroup from "./GamesIframesButtonGroup"

export default function IframesCasey() {
  let iframe = "None"
  const [none, setNone] = useState(true)
  const [mon, setMon] = useState(false)
  const [fri, setFri] = useState(false)
  const selectIframeContents = (event) => {
    iframe = event.target.name
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

  return (
    <>
      <h3>Schedules</h3>
      <ButtonGroup
        buttons={["None", "Mon", "Fri"]}
        doAfterClick={selectIframeContents}
      />
      {none && <div></div>}
      {mon && (
        <div>
          <iframe
            src="https://docs.google.com/spreadsheets/d/1JxSAKGRCQcRKJLn0WPodex1Q_T5BrRrDGCpEqxPyDV0/edit#gid=1358320276"
            width="90%"
            height="800"
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
