import React, {Fragment } from 'react';
import './App.css';
import { set, get, jget, jset } from './local-storage-functions';



function NavbarChange() {

  function handleClickChange() {
      set('ShowTables', 'false');
      set('IsLoggedIn', 'false');
      window.location.reload(false);
  };
  

  function handleClickUpdate() {
    set('ShowTables', 'true');
    window.location.reload(false);
};

  return (
    <Fragment>
        <div>
        <ul id="nav">
            <li
              onClick={handleClickChange}
            >
              <a href="#">
                  Change Golfer or Tees
              </a>
            </li>
            <li
              onClick={handleClickUpdate}
            >
              <a href="#">
                  Update Index
              </a>
            </li>
        </ul>
        </div>
    </Fragment>

  );

}

export default NavbarChange;