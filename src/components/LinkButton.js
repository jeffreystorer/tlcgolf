import React from 'react';
import '../styles/App.css';
import {get} from '../functions/localStorage';

const LinkButton = ({title}) => {
  const sheetURL =get('sheetURL')

  function handleClick() {
    localStorage.clear();
    document.location='/settings/login';
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