import React from "react"
import ExportLineupPDF from "./ExportLineupPDF"

const ExportButtonDownLoadScreenshot = ({ title, dataUrl }) => {
  function handleClick() {
    var link = document.createElement("a")
    link.download = title + ".jpeg"
    link.href = dataUrl
    link.click()
  }
  return (
    <>
      <button className="center" onClick={handleClick}>
        Download Screenshot (for emailing)
      </button>
      <ExportLineupPDF title={title} dataUrl={dataUrl} />
    </>
  )
}
export default ExportButtonDownLoadScreenshot
