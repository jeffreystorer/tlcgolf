import React, { useEffect, useRef } from "react"
import Textarea from "react-expanding-textarea"

const ExportTextarea = ({
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
        readOnly={true}
        ref={textareaRef}
      />
    </>
  )
}

export default ExportTextarea
