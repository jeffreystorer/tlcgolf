import React, {useEffect} from 'react';
import '../styles/App.css';
import { set, useStateWithLocalStorage } from '../functions/localStorage';
//import {useRecoilState} from 'recoil';
//import {ghinNumberState, lastNameState} from '../state';
import setSheetURL from '../functions/setSheetURL';
import useDataAPI from '../functions/useDataAPI';
import timeout from '../functions/timeout';

function LoginPage() {
  const [ghinNumber, setGHINNumber] = useStateWithLocalStorage('ghinNumber');
  const [lastName, setLastName] = useStateWithLocalStorage('lastName');
  const [{data}, doFetch] = useDataAPI("", []);

  useEffect(() => {
    localStorage.clear();
    setGHINNumber("GHIN Number");
    setLastName('Last Name');
    set('isLoggedIn', "false")
    //eslint-disable-next-line
  },[]);
  
  useEffect(() => {
    set('ghinNumber', ghinNumber);
  }, [ghinNumber]);

  useEffect(() => {
    set('lastName', lastName);
  }, [lastName]);

  useEffect(() => {
    let ghinRequest = "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" + ghinNumber + "&lastName=" + lastName + "&incllsudeLowHandicapIndex=true";
    doFetch(ghinRequest);
    set('isLoggedIn', 'true');
    try {
      //eslint-disable-next-line
      let aGolfer =  data.golfers[0].FirstName + ' ' + data.golfers[0].LastName;
    } catch (error){
      set('isLoggedIn', 'false');
    }
  }, [data, ghinNumber, lastName, doFetch]);

  useEffect(() => {

    return () => {
      setSheetURL(ghinNumber);
      timeout(1000);
    }
  }, [ghinNumber])

  function handleClick(e){
    set('ghinNumber', ghinNumber);
    set('lastName', lastName);
    const defaultTees =[{"label":"Club","value":"C"},{"label":"Club/Medal","value":"C/M"},{"label":"Medal","value":"M"}];
    set('teesSelected', defaultTees);
    timeout(1000);
    document.location='/settings/selecttees';
    }

  return (
      <>
        <div className='center' id='change-golfer'>
        <h5 width="95%">
          The first time you use this app on any device or<br/>
          to change golfers, you must login.<br/>
          You must also login again after<br/>
          creating or editing your table of games.
        </h5><br/>
          <div>
            <label htmlFor='ghinnumber'>GHIN Number:&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input 
              type="text" 
              id="ghinnumber" 
              name="ghinnumber"
              defaultValue='GHIN Number'
              onFocus={event => event.target.value = ghinNumber}
              onBlur={event => setGHINNumber(event.target.value)}
            />
          </div>

            <br></br><br></br>
          
          <div>
            <label htmlFor='lastName'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last Name:&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName"
              defaultValue='Last Name'
              onFocus={event => event.target.value = lastName}
              onBlur={event => setLastName(event.target.value)}
            />
          </div>
          <br/><br/>
          <div>
             <button 
              onClick={handleClick}
              >
                Next 
            </button>
          </div>
        </div>
      </>
  );
}


export default LoginPage;