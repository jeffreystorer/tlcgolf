import React from "react"
import { jsPDF } from "jspdf"
import domtoimage from "dom-to-image"

const ExportButtonDownLoadPDFPortrait8 = ({ dimensions, title }) => {
  const PAPER_DIMENSIONS = {
    width: 8.16,
    height: 10.56,
  }

  const PAPER_RATIO = PAPER_DIMENSIONS.width / PAPER_DIMENSIONS.height
  const imageDimensions = (dimensions) => {
    // If the image is in portrait and the full height would skew
    // the image ratio, we scale the image dimensions.
    const imageRatio = dimensions.width / dimensions.height
    if (imageRatio > PAPER_RATIO) {
      const imageScaleFactor =
        (PAPER_RATIO * dimensions.height) / dimensions.width

      const scaledImageHeight = PAPER_DIMENSIONS.height * imageScaleFactor

      return {
        height: scaledImageHeight,
        width: scaledImageHeight * imageRatio,
      }
    }

    // The full height can be used without skewing the image ratio.
    return {
      width: PAPER_DIMENSIONS.height / (dimensions.height / dimensions.width),
      height: PAPER_DIMENSIONS.height,
    }
  }

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: [8.16, 10.56],
  })
  function handleClick() {
    createPDF()
  }

  function createPDF() {
    domtoimage
      .toJpeg(document.getElementById("div_collage-portrait8"), {
        quality: 1.0,
      })
      .then(function (dataUrl) {
        let x, y, w, h
        x = (PAPER_DIMENSIONS.width - imageDimensions(dimensions).width) / 2
        y = (PAPER_DIMENSIONS.height - imageDimensions(dimensions).height) / 2
        w = imageDimensions(dimensions).width
        h = imageDimensions(dimensions).height
        doc.addImage(dataUrl, "JPEG", x, y, w, h)
        doc.setProperties({ title: title })
        doc.save(title + " (portrait, 4 per page).pdf")
      })
  }
  return (
    <>
      <button className="button" onClick={handleClick}>
        12 per page
      </button>
    </>
  )
}
export default ExportButtonDownLoadPDFPortrait8
