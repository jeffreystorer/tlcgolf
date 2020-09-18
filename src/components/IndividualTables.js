import React, {useEffect} from 'react';
import IndividualTableHeader from './IndividualTableHeader';
import CHTableBody from './CHTableBody';
import TSTableBody from './TSTableBody';
import '../styles/App.css';
import useDataAPI from '../functions/useDataAPI';
import {get, useStateWithLocalStorage} from '../functions/localStorage'

export default function IndividualTables(){
  //eslint-disable-next-line
  const [ghinNumber, setGHINNumber] = useStateWithLocalStorage('ghinNumber');
  //eslint-disable-next-line
  const [lastName, setLastName] = useStateWithLocalStorage('lastName');
  const [index, setIndex] = useStateWithLocalStorage('index');
  const [gender, setGender] = useStateWithLocalStorage('gender');
  const [golfer, setGolfer] = useStateWithLocalStorage('golfer')
  const [{data}, doFetch] = useDataAPI("", [])

  useEffect(() => {
    let ghinRequest = "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" + ghinNumber + "&lastName=" + lastName + "&incllsudeLowHandicapIndex=true";
    doFetch(ghinRequest);
    try {
/*       set('index', data.golfers[0].Value);
      set('gender', data.golfers[0].Gender);
      set('golfer', data.golfers[0].FirstName + " " + get('lastName') + " (" + get('index') + ")") */
      setIndex(data.golfers[0].Value);
      setGender(data.golfers[0].Gender);
      setGolfer(data.golfers[0].FirstName + " " + get('lastName') + " (" + data.golfers[0].Value + ")")
    } catch (error) {
    }
    //eslint-disable-next-line
  }, [data, ghinNumber, lastName, doFetch])


  let teesSelected = get('teesSelected');
/*   index =  get('index');
  gender = get('gender');
  golfer = get('golfer'); */
  
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
                <CHTableBody index={index} gender={gender} teesSelected ={teesSelected} />
              </tbody>
    
            </table>
              <br/>
            <table id='tstable'>
              <thead>
                <IndividualTableHeader tableName='Score*' />
              </thead>
              <tbody>
                <TSTableBody  index={index} gender={gender} teesSelected ={teesSelected}/>
              </tbody>
            </table>
            <br></br>
            <p className='center'>*Score you must average eight out of your<br></br>last twenty rounds to maintain your index.</p>
          </div>
        </>

    )
}
