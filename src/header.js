import React, {Fragment} from 'react';
import './App.css';
import { set, get, jget, jset } from './local-storage-functions';



function Header() {

return(
  <Fragment>
    <div
      className='header'
    >
      TLC Golf Apps
    </div>
  </Fragment>
)}

export default Header;