import React from 'react';
import '../styles/App.css';
import {useRecoilValue} from 'recoil';
import * as state from '../state';

const LinkButton = ({title}) => {
  const sheetURL = useRecoilValue(state.sheetURLState);

  function handleClick() {
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