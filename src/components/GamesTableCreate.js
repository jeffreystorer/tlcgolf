import React from 'react';
import LinkButton from './LinkButton';
import {useRecoilValue} from 'recoil';
import * as state from '../state'

export default function GamesTableCreate() {
  const ghinNumber = useRecoilValue(state.ghinNumberState)
  return(
    <>
      <p className='center'>Before you can display this table,<br></br>
                            you must create a table of your players<br></br>
                            and games in Google Sheets.<br></br><br></br>
                            Do this by adding a new sheet, whose name is<br></br>
                            your GHIN Number ({ghinNumber}).<br></br><br></br>
                            You may copy another user's table and then edit it.<br></br>
                            You may give your games any name you wish (no spaces).
                            </p>
      <p className='center'>When you have created your table,<br></br>
                          go back to this app with your browser<br></br>and login again.
                        </p><br></br>
      <LinkButton title={'Create Table'} />
    </>
  )
}

