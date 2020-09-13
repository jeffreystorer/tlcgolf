import React from 'react';
import Select from 'react-select'
import '../styles/App.css';
import { set, get} from '../functions/localStorage';
import setSheetURL from '../functions/setSheetURL';
import fetchGoogleSheet from '../functions/fetchGoogleSheet';


let selectedOption;
const SelectTeesPage = () => {
  let ghinNumber = get('ghinNumber');
  setSheetURL(ghinNumber);
  const  options  = [
    { label:  'Championship (Men only)', value:  'CH'  },
    { label:  'Tournament (Men only)', value:  'T'  },
    { label:  'Tournament/Club (Men only)', value:  'T/C'  },
    { label:  'Club', value:  'C'  },
    { label:  'Club/Medal', value:  'C/M'},
    { label:  'Medal', value:  'M'},
    { label:  'Medal/Course', value:  'M/CRS'},
    { label:  'Long Course', value:  'LCRS'},
    { label:  'Course', value:  'CRS'},
    { label:  'Short Course (Women Only)', value:  'SCRS'},
    { label:  'Island', value:  'ISL'},
    { label:  'Skidaway/Course', value:  'SK/CRS'},
    { label:  'Skidaway', value: 'SK'}
  ]

  const  handleOnChange =  selectedOption  => {
  if ((selectedOption !== null) & (selectedOption !== '[]')) {
    set('teesSelected', selectedOption);
    }
  }

  function handleClick() {
    let hasGoogleSheet = get('hasGoogleSheet');
    if (hasGoogleSheet === "true") fetchGoogleSheet(ghinNumber);
    document.location = '/'
  };

    return (
    <div align="center">
      <h5>
        Please select at least one set of tees,<br/>
        then click the "Next" button<br/>
        (default is C, C/M, M):
      </h5>
      <br/><br/>
      <Select
        value = {selectedOption}
        isMulti='true'
        className='dropdown-center'
        placeholder='Select Tees to Display . . .'
        /* jsonValue='true' */
        onChange={handleOnChange}
        options={options}
      />
      <br/><br/>
        <div>
          <button
            onClick={handleClick}>
                Next         
          </button>
        </div>
    </div>
      );
}

export default SelectTeesPage;