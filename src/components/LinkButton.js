import React from 'react';
import {get} from '../functions/localStorage'
import '../styles/App.css';

const LinkButton = ({title}) => {

  function handleClick() {
    let sheetURL = get('sheetURL');
    localStorage.clear();
    document.location=sheetURL;
}

  return (
    <>
      <div className='link-center'>
        <button
        onClick={handleClick}
        >
          {title}
        </button>
      </div>
  </>

    )
}

export default LinkButton;