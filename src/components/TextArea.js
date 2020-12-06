import React, { useState } from "react"
import { set } from "../functions/localStorage"

export default function TextArea(value) {
  const [textAreaValue, setTextAreaValue] = useState(value)

  const handleChange = (event) => {
    setTextAreaValue(event.target.value)
  }

  const handleSubmit = (event) => {
    set("savedTextAreaValue", event.target.value)
    event.preventDefault()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea
          id="lineup-textarea"
          rows="8"
          cols="39"
          value={textAreaValue}
          onChange={handleChange}
        />
        <br></br>
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}
