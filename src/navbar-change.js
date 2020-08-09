import React, {Fragment } from 'react';
import './App.css';


function NavbarChange() {

  function handleClickChange() {
      localStorage.setItem('lsShowTables', 'false');
      localStorage.setItem('lsIsLoggedIn', 'false');
      window.location.reload(false);
  };
  

  function handleClickUpdate() {
    localStorage.setItem('lsShowTables', 'true');
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