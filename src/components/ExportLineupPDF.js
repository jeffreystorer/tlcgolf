import React, { useState, useEffect } from "react"
import { ReactPhotoCollage } from "react-photo-collage"
import ExportButtonDownloadPDFPortrait4 from "./ExportButtonDownloadPDFPortrait4"
import ExportButtonDownloadPDFPortrait8 from "./ExportButtonDownloadPDFPortrait8"
import ExportButtonDownloadPDFLandscape4 from "./ExportButtonDownloadPDFLandscape4"
import ExportButtonDownloadPDFLandscape8 from "./ExportButtonDownloadPDFLandscape8"
import "../styles/App.css"

const ExportLineupPDF = ({ title, dataUrl }) => {
  const [loading, setLoading] = useState(true)
  const [portrait4Setting, setPortrait4Setting] = useState()
  const [portrait8Setting, setPortrait8Setting] = useState()
  const [landscape4Setting, setLandscape4Setting] = useState()
  const [landscape8Setting, setLandscape8Setting] = useState()
  const img = new Image()
  img.src = dataUrl

  //portrait 4
  let portrait4Factor = 2.0
  let portrait4Width = img.width * 2 * portrait4Factor
  let portrait4WidthPx = portrait4Width.toString() + "px"
  let portrait4Height = img.height * portrait4Factor
  let portrait4HeightPx = portrait4Height.toString() + "px"
  let portrait4ImgDimensions = {
    width: portrait4Width,
    height: portrait4Height * 2,
  }
  let portrait4StyleWidth = portrait4ImgDimensions.width + "px"
  let portrait4StyleHeight = portrait4ImgDimensions.height + "px"

  //portrait 8
  let portrait8Factor = 2.0
  let portrait8Width = img.width * 4 * portrait8Factor
  let portrait8WidthPx = portrait8Width.toString() + "px"
  let portrait8Height = img.height * portrait8Factor
  let portrait8HeightPx = portrait8Height.toString() + "px"
  let portrait8ImgDimensions = {
    width: portrait8Width,
    height: portrait8Height * 3,
  }
  let portrait8StyleWidth = portrait8ImgDimensions.width + "px"
  let portrait8StyleHeight = portrait8ImgDimensions.height + "px"

  //landscape 4
  let landscape4Factor = 2.0
  let landscape4Width = img.width * 4 * landscape4Factor
  let landscape4WidthPx = landscape4Width.toString() + "px"
  let landscape4Height = img.height * landscape4Factor
  let landscape4HeightPx = landscape4Height.toString() + "px"
  let landscape4ImgDimensions = {
    width: landscape4Width,
    height: landscape4Height,
  }
  let landscape4StyleWidth = landscape4ImgDimensions.width + "px"
  let landscape4StyleHeight = landscape4ImgDimensions.height + "px"

  //landscape 8
  let landscape8Factor = 2.0
  let landscape8Width = img.width * 4 * landscape8Factor
  let landscape8WidthPx = landscape8Width.toString() + "px"
  let landscape8Height = img.height * landscape8Factor
  let landscape8HeightPx = landscape8Height.toString() + "px"
  let landscape8ImgDimensions = {
    width: landscape8Width,
    height: landscape8Height * 2,
  }
  let landscape8StyleWidth = landscape8ImgDimensions.width + "px"
  let landscape8StyleHeight = landscape8ImgDimensions.height + "px"

  const PortraitCollage4 = () => <ReactPhotoCollage {...portrait4Setting} />
  const PortraitCollage8 = () => <ReactPhotoCollage {...portrait8Setting} />
  const LandscapeCollage4 = () => <ReactPhotoCollage {...landscape4Setting} />
  const LandscapeCollage8 = () => <ReactPhotoCollage {...landscape8Setting} />

  useEffect(() => {
    setPortrait4Setting({
      width: portrait4WidthPx,
      height: [portrait4HeightPx, portrait4HeightPx],
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
  }, [portrait4WidthPx, portrait4HeightPx, dataUrl])

  useEffect(() => {
    setPortrait8Setting({
      width: portrait8WidthPx,
      height: [portrait8HeightPx, portrait8HeightPx, portrait8HeightPx],
      layout: [4, 4, 4],
      photos: [
        { src: dataUrl },
        { src: dataUrl },
        { src: dataUrl },
        { src: dataUrl },
        { src: dataUrl },
        { src: dataUrl },
        { src: dataUrl },
        { src: dataUrl },
        { src: dataUrl },
        { src: dataUrl },
        { src: dataUrl },
        { src: dataUrl },
      ],
      showNumOfRemainingPhotos: false,
    })
    setLoading(false)
  }, [portrait8WidthPx, portrait8HeightPx, dataUrl])

  useEffect(() => {
    setLandscape4Setting({
      width: landscape4WidthPx,
      height: [landscape4HeightPx],
      layout: [4],
      photos: [
        { src: dataUrl },
        { src: dataUrl },
        { src: dataUrl },
        { src: dataUrl },
      ],
      showNumOfRemainingPhotos: false,
    })
    setLoading(false)
  }, [dataUrl, landscape4HeightPx, landscape4WidthPx])

  useEffect(() => {
    setLandscape8Setting({
      width: landscape8WidthPx,
      height: [landscape8HeightPx, landscape8HeightPx],
      layout: [4, 4],
      photos: [
        { src: dataUrl },
        { src: dataUrl },
        { src: dataUrl },
        { src: dataUrl },
        { src: dataUrl },
        { src: dataUrl },
        { src: dataUrl },
        { src: dataUrl },
      ],
      showNumOfRemainingPhotos: false,
    })
    setLoading(false)
  }, [landscape8WidthPx, landscape8HeightPx, dataUrl])

  return (
    <>
      {loading ? (
        <p> Loading . . .</p>
      ) : (
        <>
          <div className="center">
            <h4>
              To download a pdf for printing<br></br>
              multiple lineups per page:
            </h4>
            <table className="table_pdfs">
              <thead className="table_pdfs-thead">
                <tr>
                  <th>Portrait</th>
                  <th>Landscape</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <ExportButtonDownloadPDFPortrait4
                      dimensions={portrait4ImgDimensions}
                      title={title}
                    />
                  </td>
                  <td>
                    <ExportButtonDownloadPDFLandscape4
                      dimensions={landscape4ImgDimensions}
                      title={title}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <ExportButtonDownloadPDFPortrait8
                      dimensions={portrait8ImgDimensions}
                      title={title}
                    />
                  </td>
                  <td>
                    <ExportButtonDownloadPDFLandscape8
                      dimensions={landscape8ImgDimensions}
                      title={title}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
          <div className="center">
            <h1>PLEASE IGNORE THE COLLAGES BELOW.</h1>
            <h1>THEY USED FOR CREATING THE PDF.</h1>
          </div>
          <div
            id="div_collage-portrait4"
            className="background-white center"
            style={{
              width: { portrait4StyleWidth },
              height: { portrait4StyleHeight },
            }}
          >
            <PortraitCollage4 />
          </div>
          <br />
          <br />
          <br />
          <div
            id="div_collage-portrait8"
            className="background-white center"
            style={{
              width: { portrait8StyleWidth },
              height: { portrait8StyleHeight },
            }}
          >
            <PortraitCollage8 />
          </div>
          <div
            id="div_collage-landscape4"
            className="background-white center"
            style={{
              width: { landscape4StyleWidth },
              height: { landscape4StyleHeight },
            }}
          >
            <LandscapeCollage4 />
          </div>
          <br />
          <br />
          <br />
          <div
            id="div_collage-landscape8"
            className="background-white center"
            style={{
              width: { landscape8StyleWidth },
              height: { landscape8StyleHeight },
            }}
          >
            <LandscapeCollage8 />
          </div>
        </>
      )}
    </>
  )
}
export default ExportLineupPDF
