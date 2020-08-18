import React, {Fragment} from 'react';
import './App.css';
import CHTableBody from './ch-table-body';
import TSTableBody from './ts-table-body';
import { set, get, jget, jset } from './local-storage-functions';


function IndividualTables() {
  return (
    <Fragment>
      <div className='center golfer-center'>
          {get('Golfer') + ' (Index: ' + get('Index') + ')'}
      </div>      
      <br/>
      <div id='table'>
        <table id='chtable'>
          <thead>
            <tr>
              <th
                scope='col'
                className='left-header-cell'
              >
                CrsHcp
              </th>
              <th scope='col'>DC</th>
              <th scope='col'>MG</th>
              <th scope='col'>MW</th>
              <th scope='col'>OK</th>
              <th scope='col'>PA</th>
              <th scope='col'>TP</th>
            </tr>
          </thead>
          <tbody>
            <CHTableBody />
          </tbody>

        </table>
          <br/>
        <table id='tstable'>
          <thead>
            <tr>
              <th
                scope='col'
                className='left-header-cell'
              >
                Score
              </th>
              <th scope='col'>DC</th>
              <th scope='col'>MG</th>
              <th scope='col'>MW</th>
              <th scope='col'>OK</th>
              <th scope='col'>PA</th>
              <th scope='col'>TP</th>
            </tr>
          </thead>
          <tbody>
            <TSTableBody />
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default IndividualTables;