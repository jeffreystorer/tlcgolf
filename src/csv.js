import React from 'react'
import { CSVReader } from 'react-papaparse'
import { CSVLink } from 'react-csv';

const buttonRef = React.createRef()

function CSV () {
  function handleOpenDialog(e) {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  function handleOnFileLoad(data) {
    localStorage.setItem("lsData", JSON.stringify(data));
  }

  function handleOnError(err, file, inputElem, reason) {
    console.log(err)
  }

    let myConfig = {header: false};
    return (
      <>
        <h5>Upload Your Table of Players and Games (*.csv file)</h5>
        <CSVReader
          ref={buttonRef}
          onFileLoad={handleOnFileLoad}
          onError={handleOnError}
          noClick
          noDrag
          config={myConfig}/* 
          onRemoveFile={handleOnRemoveFile} */
        >
          {({ file }) => (
            <aside
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10
              }}
            >
              <button
                type='button'
                onClick={handleOpenDialog}
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  width: '40%',
                  paddingLeft: 0,
                  paddingRight: 0
                }}
              >
                Browse for the file to upload
              </button>
              <div
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#ccc',
                  height: 45,
                  lineHeight: 2.5,
                  marginTop: 5,
                  marginBottom: 5,
                  paddingLeft: 13,
                  paddingTop: 3,
                  width: '60%'
                }}
              >
                {file && file.name}
              </div>{/* 
              <button
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 20,
                  paddingRight: 20
                }}
                onClick={handleRemoveFile}
              >
                Clear file name
              </button> */}
            </aside>
          )}
        </CSVReader>
        <br />
        <br />
        <CSVLink
          filename={localStorage.getItem('lsGHINNumber') + ".csv"}
          color="primary"
          style={{float: "left", marginRight: "10px"}}
          className="btn btn-primary"
          data={JSON.parse(localStorage.getItem('lsPlayerTable'))}>
          Download Your Table of Players and Games as {localStorage.getItem('lsGHINNumber')}.csv
        </CSVLink>
      </>
    )
  }

export default CSV;