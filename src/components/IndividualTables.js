import React, {useEffect} from 'react';
import IndividualTableHeader from './IndividualTableHeader';
import CHTableBody from './CHTableBody';
import TSTableBody from './TSTableBody';
import '../styles/App.css';
import useDataAPI from '../functions/useDataAPI';
import {get, set} from '../functions/localStorage'

export default function IndividualTables(){
  const ghinNumber = get('ghinNumber');
  const lastName = get('lastName');
  const [{data}, doFetch] = useDataAPI("", [])
  let index, gender, teesSelected, golfer;

  useEffect(() => {
    let ghinRequest = "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" + ghinNumber + "&lastName=" + lastName + "&incllsudeLowHandicapIndex=true";
    doFetch(ghinRequest);
    try {
    set('index', data.golfers[0].Value);
    set('gender', data.golfers[0].Gender);
    set('golfer', data.golfers[0].FirstName + " " + get('lastName') + " (" + get('index') + ")")
    } catch (error) {
      console.log('error: ' + error)
    }
    //eslint-disable-next-line
  }, [data, ghinNumber, lastName, doFetch])


  teesSelected = get('teesSelected');
  index = get('index');
  gender = get('gender');
  golfer = get('golfer')
  
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
                <IndividualTableHeader tableName='Score' />
              </thead>
              <tbody>
                <TSTableBody  index={index} gender={gender} teesSelected ={teesSelected}/>
              </tbody>
            </table>
          </div>
        </>

    )
}
