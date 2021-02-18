import React from "react"
import { jsPDF } from "jspdf"
import domtoimage from "dom-to-image"

const ExportButtonDownLoadPDFLandscape8 = ({ dimensions, title }) => {
  const PAPER_DIMENSIONS = {
    width: 11,
    height: 8.5,
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
    orientation: "landscape",
    unit: "in",
    format: [11, 8.5],
  })
  function handleClick() {
    createPDF()
  }

  function createPDF() {
    domtoimage
      .toJpeg(document.getElementById("div_collage-landscape8"), {
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
        doc.save(title + " (landscape, 8 per page).pdf")
      })
  }
  return (
    <>
      <button className="button" onClick={handleClick}>
        8 per page
      </button>
    </>
  )
}
export default ExportButtonDownLoadPDFLandscape8
