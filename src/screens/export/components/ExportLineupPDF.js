import React, { useState, useEffect } from "react"
import { ReactPhotoCollage } from "react-photo-collage"
import ExportButtonDownloadPDF from "./ExportButtonDownloadPDF"
import {
  DivCentered,
  DivCenteredBackgroundWhite,
} from "../../../shared/components/StyledComponents"

const ExportLineupPDF = ({ title, dataUrl }) => {
  const [loading, setLoading] = useState(true)
  const [setting, setSetting] = useState()
  const img = new Image()
  img.src = dataUrl
  let factor = 2.0
  let width = img.width * 2 * factor
  let widthPx = width.toString() + "px"
  let height = img.height * factor
  let heightPx = height.toString() + "px"
  let imgDimensions = { width: width, height: height * 2 }
  let styleWidth = imgDimensions.width + "px"
  let styleHeight = imgDimensions.height + "px"
  const Collage = () => <ReactPhotoCollage {...setting} />

  useEffect(() => {
    setSetting({
      width: widthPx,
      height: [heightPx, heightPx],
      layout: [2, 2],
      photos: [
        { src: dataUrl },
        { src: dataUrl },
        { src: dataUrl },
        { src: dataUrl },
      ],
      showNumOfRemainingPhotos: false,
    })
    setLoading(false)
  }, [widthPx, heightPx, dataUrl])

  return (
    <>
      {loading ? (
        <p> Loading . . .</p>
      ) : (
        <>
          <DivCentered>
            <br />
            <ExportButtonDownloadPDF dimensions={imgDimensions} title={title} />
          </DivCentered>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <DivCentered>
            <h1>PLEASE IGNORE THE COLLAGE BELOW.</h1>
            <h1>IT IS USED FOR CREATING THE PDF.</h1>
          </DivCentered>
          <DivCenteredBackgroundWhite
            id="div-collage"
            style={{
              width: { styleWidth },
              height: { styleHeight },
            }}
          >
            <Collage />
          </DivCenteredBackgroundWhite>
        </>
      )}
    </>
  )
}
export default ExportLineupPDF
