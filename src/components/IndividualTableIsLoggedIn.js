import React, {useEffect} from 'react';
import IndividualTableHeader from './IndividualTableHeader';
import CHTableBody from './CHTableBody';
import TSTableBody from './TSTableBody';
import '../styles/App.css';
import useDataAPI from '../functions/useDataAPI';
import {useStateWithLocalStorage} from '../functions/localStorage';
import {useRecoilValue, useRecoilState} from 'recoil';
import {firstNameState, indexState, genderState, golferStateSelector} from '../state';

function IndividualTableIsLoggedIn(){
    const [ghinNumber, setGHINNumber] = useStateWithLocalStorage('ghinNumber');
    const [lastName, setLastName] = useStateWithLocalStorage('lastName');
    const [firstName, setFirstName] = useRecoilState(firstNameState);
    const [index, setIndex] = useRecoilState(indexState);
    const [gender, setGender] = useRecoilState(genderState);
  //eslint-disable-next-line
  const [{data}, doFetch] = useDataAPI("", [])

  useEffect(() => {
    let ghinRequest = "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" + ghinNumber + "&lastName=" + lastName + "&incllsudeLowHandicapIndex=true";
    doFetch(ghinRequest);
    alert('data: ' + JSON.stringify(data));
    setFirstName(data.golfers[0].FirstName);
    setIndex(data.golfers[0].Value);
    setGender(data.golfers[0].Gender);
  }, [data, doFetch, ghinNumber, lastName, setFirstName, setGender, setIndex])

  const golfer = useRecoilValue(golferStateSelector);
    return(
        <>
          <div className='center golfer-center'>
              {golfer}
          </div>      
          <br/>
          <div id='table'>
            <table id='chtable'>
              <thead>
                <IndividualTableHeader tableName='CrsHcp' />
              </thead>
              <tbody>
                <CHTableBody />
              </tbody>
    
            </table>
              <br/>
            <table id='tstable'>
              <thead>
                <IndividualTableHeader tableName='Score' />
              </thead>
              <tbody>
                <TSTableBody />
              </tbody>
            </table>
          </div>
        </>

    )
}

export default IndividualTableIsLoggedIn;