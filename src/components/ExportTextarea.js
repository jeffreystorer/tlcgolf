import React from "react"

export default function Textarea({ textAreaValue, rows, cols }) {
  return (
    <textarea
      className="textarea"
      rows={rows}
      cols={cols}
      value={textAreaValue}
    ></textarea>
  )
}