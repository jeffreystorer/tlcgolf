import React from 'react';
import {get} from '../functions/localStorage'
import '../styles/App.css';

const LinkButton = ({title}) => {

  function handleClick() {
    document.location=get('sheetURL');
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