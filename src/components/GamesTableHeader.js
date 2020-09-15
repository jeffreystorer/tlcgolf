import React from 'react';
import createGamesTableHeaderRow from '../functions/createGamesTableHeaderRow';
import {useRecoilValue} from 'recoil';
import {teesSelectedState} from '../state'


export default function GamesTableHeader() {
  const teesSelected = useRecoilValue(teesSelectedState);
  let cols = createGamesTableHeaderRow(teesSelected);
  const getHeader = () => {
    var keys = cols;
    return keys.map((key, index)=>{
    return (
      <th
        key={index}
        scope='col'
      >
        {key}
      </th>
    )})
  }

    return (
        <>
          <tr>
            {getHeader()}
          </tr>
        </>
    );
  }