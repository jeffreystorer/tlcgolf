import React, {useEffect} from 'react';
import '../styles/App.css';
import {get} from '../functions/localStorage';

const LinkButton = ({title}) => {
  const sheetURL =get('sheetURL')
  useEffect(() => {
   
    return () => {
      document.location='/settings/login'
    }
  }, [])

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