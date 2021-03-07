import React from "react"

export default function Textarea({ textAreaValue, rows, cols }) {
  return (
    <textarea
      className="textarea_export"
      rows={rows}
      cols={cols}
      value={textAreaValue}
      readonly={true}
    ></textarea>
  )
}
