import React, {Fragment} from 'react';
import './App.css';
import TeeSelector from './tee-selector.js';

function Login() {


return (
    <Fragment>

      <div className='center' id='change-golfer'>
        <div>
          <label htmlFor='ghinnumber'>GHIN Number:&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input 
            type="text" 
            id="ghinnumber" 
            name="ghinnumber"
            defaultValue='GHIN Number'
            onFocus={event => event.target.value = localStorage.getItem('lsGHINNumber')}
            onBlur={event => localStorage.setItem('lsGHINNumber', event.target.value)}
          />
        </div>

          <br></br><br></br>
        
        <div>
          <label htmlFor='lastname'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last Name:&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input 
            type="text" 
            id="lastname" 
            name="lastname"
            defaultValue='Last Name'
            onFocus={event => event.target.value = localStorage.getItem('lsLastName')}
            onBlur={event => localStorage.setItem('lsLastName', event.target.value)}
          />
        </div>

          <br></br><br></br>

        <div>
          <span><TeeSelector /></span>
        </div>
      </div>
    </Fragment>
  );
}


export default Login;
