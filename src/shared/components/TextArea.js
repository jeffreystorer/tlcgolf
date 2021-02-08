import React, { useState } from "react"
import { set, get } from "../helpers/localStorage"

export default function TextArea() {
  const [textAreaValue, setTextAreaValue] = useState(get("textAreaValue"))

  function handleOnBlur() {
    set("textAreaValue", textAreaValue)
  }

  function handleValueChange(event) {
    setTextAreaValue(event.target.value)
  }

  return (
    <>
      <textarea
        id="lineup-textarea"
        rows="10"
        cols="39"
        value={textAreaValue}
        onBlur={handleOnBlur}
        onChange={handleValueChange}
      ></textarea>
    </>
  )
}
