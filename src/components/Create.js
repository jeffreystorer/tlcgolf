import React from 'react';
import {get} from '../functions/localStorage';
import LinkButton from './LinkButton';

function Create() {
  return(
    <>
      <p className='center'>Before you can display the table of Games,<br></br>
                            you must create a table of your players<br></br>
                            and games in Google Sheets.<br></br><br></br>
                            Do this by adding a new sheet, whose name is<br></br>
                            your GHIN Number ({get('ghinNumber')}).<br></br><br></br>
                            You may copy another user's table and then edit it.<br></br>
                            You may give your games any name you wish (no spaces).
                            </p>
      <p className='center'>When you have created your table,<br></br>
                          restart this app.
                        </p><br></br>
      <LinkButton title={'Create Table'} />
    </>
  )
}

export default Create;