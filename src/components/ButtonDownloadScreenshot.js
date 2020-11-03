
import React from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from '../functions/fileSaver.js';

const ButtonDownLoadScreenshot = ({
    game,
    course,
    element,
    format
}) => {

function handleClick(){
  if (format === "PNG") {
    domtoimage.toBlob(document.getElementById(element))
      .then(function (blob) {
          saveAs(blob, 'Lineup for ' + game + " at " + course.toUpperCase() + '.png');
      });
    }
  if (format === "JPEG"){
    domtoimage.toJpeg(document.getElementById(element), { quality: 0.95 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'Lineup for ' + game + " at " + course.toUpperCase() + '.jpeg';
        link.href = dataUrl;
        link.click();
    });
  }
  }
  return (
    <button className='center' onClick={handleClick}>Download Screenshot</button>
  )
  }
  export default ButtonDownLoadScreenshot;