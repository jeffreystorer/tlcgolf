import React, { useEffect, useRef } from "react"
import Textarea from "react-expanding-textarea"

const LineupTextarea = ({
  textareaValue,
  handleTextareaValueChange,
  handleTextareaOnBlur,
}) => {
  const textareaRef = useRef(null)

  useEffect(() => {
    textareaRef.current.focus()
  }, [])

  return (
    <>
      <Textarea
        className="textarea"
        cols="41"
        value={textareaValue}
        onChange={handleTextareaValueChange}
        onFocus={(event) => (event.target.value = textareaValue)}
        onBlur={handleTextareaOnBlur}
        placeholder="Enter your bets, entry fee, prizes, and rules . . ."
        ref={textareaRef}
      />
    </>
  )
}

export default LineupTextarea
