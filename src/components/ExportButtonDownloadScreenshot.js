import React, { useEffect, useRef, useState } from "react"
import ExportLineupPDF from "./ExportLineupPDF"
import copyImg from "copy-image-clipboard"
import lineup from "../lineup.jpeg"
import * as imageDataURI from "image-data-uri"
import domtoimage from "dom-to-image"

const ExportButtonDownLoadScreenshot = ({ title, dataUrl }) => {
  const [loading, setLoading] = useState(true)
  const [newLineup, setNewLineup] = useState()
  const jpgImageRef = useRef()
  console.log("😊😊 lineup", lineup)

  useEffect(() => {
    domtoimage
      .toJpeg(document.getElementById("lineup-table-div"), { quality: 0.95 })
      .then(function (dataUrl) {
        console.log("😊😊 dataUrl", dataUrl)
        imageDataURI
          .outputFile(dataUrl, "/static/media/lineup.810763ce")
          .then(function (res) {
            setNewLineup(res)
            console.log("😊😊 res", res)
            setLoading(false)
          })
      })
  }, [])

  const copyJpgImage = async () => {
    try {
      const src = jpgImageRef.current.src
      console.log("😊😊 src", src)
      await copyImg(src)
      alert("JPG image Copied")
    } catch (e) {
      console.log(e)
    }
  }

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
      {loading ? (
        <p>Loading . . . </p>
      ) : (
        <div className="img-container center">
          <img ref={jpgImageRef} className="img" src={newLineup} alt="lineup" />
          <br></br>
          <button className="button" type="button" onClick={copyJpgImage}>
            Copy JPG Image to Clipboard
          </button>
        </div>
      )}
      <ExportLineupPDF title={title} dataUrl={dataUrl} />
    </>
  )
}
export default ExportButtonDownLoadScreenshot
