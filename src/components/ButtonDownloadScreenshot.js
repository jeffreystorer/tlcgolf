
import React from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from '../functions/fileSaver.js';

const ButtonDownLoadScreenshot = ({
    game,
    course,
    element
}) => {

function handleClick(){
    domtoimage.toBlob(document.getElementById(element))
      .then(function (blob) {
          saveAs(blob, 'Lineup for ' + game + " at " + course.toUpperCase() + '.png');
      });
  }
  return (
    <button className='center' onClick={handleClick}>Download Screenshot</button>
  )
  }
  export default ButtonDownLoadScreenshot;