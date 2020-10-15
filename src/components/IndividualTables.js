import React from 'react';
import IndividualTableHeader from './IndividualTableHeader';
import CHTableBody from './CHTableBody';
import TSTableBody from './TSTableBody';
import '../styles/App.css';
import {get} from '../functions/localStorage';
import fetchIndividualGHIN from '../functions/fetchIndividualGHIN';
import fetchCourseData from '../functions/fetchCourseData';

export default function IndividualTables(){
  const [index, gender, golfer] = fetchIndividualGHIN();
  const [ratings, slopes, pars] = fetchCourseData();

  let teesSelected = get('teesSelected');
  
    return(
        <>
          <div className='center golfer-center'>
              {golfer}
          </div>      
          <br/>
          <div id='individual-table'>
            <table id='ch-table'>
              <thead>
                <IndividualTableHeader tableName='CrsHcp' />
              </thead>
              <tbody>
                <CHTableBody index={index} gender={gender} teesSelected ={teesSelected} ratings={ratings} slopes={slopes} pars={pars}/>
              </tbody>
    
            </table>
              <br/>
            <table id='ts-table'>
              <thead>
                <IndividualTableHeader tableName='Score*' />
              </thead>
              <tbody>
                <TSTableBody  index={index} gender={gender} teesSelected ={teesSelected} ratings={ratings} slopes={slopes} pars={pars}/>
              </tbody>
            </table>
            <br></br>
            <p className='center'>*Score you must average eight out of your<br></br>last twenty rounds to maintain your index.</p>
          </div>
        </>

    )
}
