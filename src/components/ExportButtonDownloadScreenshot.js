import React, { useEffect, useState, useRef } from "react"
import ExportLineupPDF from "./ExportLineupPDF"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import getOperatingSystemName from "../functions/getOperatingSystemName"

const ExportButtonDownLoadScreenshot = ({ title, dataUrl }) => {
  let OSName = getOperatingSystemName()
  let showCopyLineupToClipboard = true
  switch (OSName) {
    case "Linux":
      showCopyLineupToClipboard = false
      break
    case "UNIX":
      showCopyLineupToClipboard = false
      break
    case "iOS":
      showCopyLineupToClipboard = false
      break
    default:
      break
  }
  const [loading, setLoading] = useState(true)
  const jpgImageRef = useRef()

  let link = document.createElement("a")
  link.download = "lineup.jpeg"
  link.href = dataUrl

  useEffect(() => {
    setLoading(false)
  }, [])

  function copyImageToClipboard(element) {
    console.log("😊😊 element.firstChild", element.firstChild)
    const selection = window.getSelection()
    const range = document.createRange()
    const img = element.firstChild

    // Preserve alternate text
    const altText = img.alt
    img.setAttribute("alt", img.src)

    range.selectNodeContents(element)
    selection.removeAllRanges()
    selection.addRange(range)

    try {
      // Security exception may be thrown by some browsers.
      console.log("image copied to clipboard")
      return document.execCommand("copy")
    } catch (ex) {
      console.warn("Copy to clipboard failed.", ex)

      return false
    } finally {
      console.log("finally")
      img.setAttribute("alt", altText)
    }
  }

  function handleClick() {
    var link = document.createElement("a")
    link.download = title + ".jpeg"
    link.href = dataUrl
    link.click()
  }

  function handleCopyClick() {
    copyImageToClipboard(jpgImageRef.current)
    toast("Lineup Copied to Clipboard", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  const CopyLineupToClipboard = () => {
    if (loading) {
      return <p> Loading. . .</p>
    } else {
      return (
        <>
          <h4>To paste the lineup into an email:</h4>
          <button name="copy" onClick={handleCopyClick}>
            Copy Lineup to Clipboard
          </button>
          <br></br>
        </>
      )
    }
  }

  return (
    <>
      {showCopyLineupToClipboard ? <CopyLineupToClipboard /> : null}
      {showCopyLineupToClipboard ? (
        <h4>To attach the lineup to an email:</h4>
      ) : (
        <h4>
          To attach the lineup to an email<br></br>
          or copy it to the clipboard<br></br>to paste into an email
        </h4>
      )}
      <button className="center" onClick={handleClick}>
        Download Screenshot
      </button>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ExportLineupPDF title={title} dataUrl={dataUrl} />
      <br></br>
      <br></br>
      <h1>PLEASE IGNORE THE IMAGE BELOW.</h1>
      <h1>IT IS USED FOR COPYING TO THE CLIPBOARD</h1>
      {loading ? (
        <p>Loading Lineup Image . . .</p>
      ) : (
        <div className="img-container center">
          <div ref={jpgImageRef} id="lineupToCopy">
            <img
              className="img"
              src={dataUrl}
              alt="Loading Lineup to Copy . . . "
            />
          </div>
        </div>
      )}
    </>
  )
}
export default ExportButtonDownLoadScreenshot
